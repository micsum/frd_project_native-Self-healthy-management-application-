import { Injectable } from '@nestjs/common';
import debug from 'debug';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Page, chromium } from 'playwright';

let log = debug('mealplan.service.ts');
log.enabled = true;

type MealPlan = {
  href: string | undefined;
  cover_image: string | undefined;
  title: string | undefined;
};

type Days = {
  name: string | undefined;
  cover_image: string | undefined;
  meals: Meal[];
};

type Meal = {
  name: string;
  calories: string;
  foods: Food[];
};
type Food = {
  name: string;
};

@Injectable()
export class MealPlanService {
  constructor(@InjectKnex() private knex: Knex) {}

  async getMealPlanList(options: { last_id: number; limit: number }) {
    log('get meal plan list');
    let mealplans = await this.knex
      .from('mealplan')
      .innerJoin('mealplan_day', 'mealplan_day.mealplan_id', 'mealplan.id')
      .select('mealplan.id', 'mealplan.title', 'mealplan.cover_image')
      .groupBy('mealplan.id')
      .count('mealplan_day.id as days')
      .orderBy('mealplan.id', 'asc')
      .where('mealplan.id', '>', options.last_id)
      .limit(options.limit);

    return { list: mealplans };
  }

  async getMealPlanDetail(mealplan_id: number) {
    log('get meal plan details');
    let days = await this.knex('mealplan_day')
      .select('id', 'mealplan_id', 'name', 'cover_image')
      .where({
        mealplan_id: mealplan_id,
      });

    for (let dayContent of days) {
      let meal_content = await this.knex('meal_content')
        .select('id', 'mealplan_day_id', 'name', 'calories', 'foods')
        .where({ mealplan_day_id: dayContent.id });
      dayContent.content = meal_content;
    }

    return days;
  }

  async scrapMealPlanList() {
    let browser = await chromium.launch({ headless: false });
    let page = await browser.newPage();

    log('scraping meal plan list');

    await page.goto('https://www.eatingwell.com/category/4286/meal-plans/');
    let mealPlanLists: MealPlan[] = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll<HTMLAnchorElement>('a[data-doc-id]'),
        (a) => ({
          href: a.href,
          cover_image: a.querySelector('img')?.dataset?.src,
          title: a.querySelector('.card__title-text')?.textContent?.trim(),
        }),
      ).filter((plan) => plan.title?.startsWith('7-Day')),
    );

    let n = mealPlanLists.length;
    log(`scrapping ${n} meal plans...`);
    let i = 0;
    for (let meal of mealPlanLists) {
      i++;
      log(`scrapping ${i}/${n} workout plan...`);
      const href = meal.href;
      if (!href) continue;
      let match = href.match(/(\d+)\/([a-z0-9-]+(.html)?)\/?/);
      if (!match) continue;
      let id = match[1];
      let slug = match[2];

      console.log({
        id,
        slug,
        href: meal.href,
        title: meal.title,
        cover_image: meal.cover_image,
      });

      await this.knex.transaction(async (knex) => {
        let row = await knex('mealplan').select('id').where({ id }).first();

        if (row) {
          await knex('mealplan').where({ id: row.id }).update({
            title: meal.title,
            href: meal.href,
            cover_image: meal.cover_image,
          });
        } else {
          [row] = await knex('mealplan')
            .insert({
              slug: slug,
              id: id,
              title: meal.title,
              href: meal.href,
              cover_image: meal.cover_image,
            })
            .returning('id');
        }

        let mealplan_id = row.id;

        async function deleteDetails() {
          await knex('meal_content')
            .innerJoin(
              'mealplan_day',
              'mealplan_day.id',
              'meal_content.mealplan_day_id',
            )
            .where({ mealplan_id })
            .delete();

          await knex('mealplan_day').where({ mealplan_id }).delete();
        }

        async function deleteAll() {
          await deleteDetails();
          await knex('mealplan').where({ id }).delete();
        }

        let days = await this.scrapMealPlanDetail(page, href, id);

        console.dir(days, { depth: 20 });

        await deleteDetails();

        if (days.length === 0) {
          await deleteAll();
          return;
        }
        for (let day of days) {
          if (day.meals.length === 0) {
            await deleteAll();
            return;
          }
          let [{ id: mealplan_day_id }] = await knex('mealplan_day')
            .insert({
              mealplan_id: id,
              name: day.name,
              cover_image: day.cover_image,
            })
            .returning('id');

          for (let meal of day.meals) {
            if (meal.foods.length === 0) {
              await deleteAll();
              return;
            }
            await knex('meal_content')
              .insert({
                mealplan_day_id,
                name: meal.name,
                calories: meal.calories,
                foods: JSON.stringify(meal.foods),
              })
              .returning('id');
          }
        }

        // }
        // await knex('mealplan_day').insert;
      });
    }

    await page.close();
    await browser.close();
  }

  async scrapMealPlanDetail(page: Page, href: string, id: string) {
    await page.goto(href);
    let mealPlan = await page.evaluate(() => {
      let published_on = document
        .querySelector<HTMLDivElement>('.mntl-attribution__item-date')
        ?.textContent?.match(/Published on (.*)/)?.[1];

      let days: Days[] = Array.from(document.querySelectorAll('h2'), (h2) => ({
        h2,
        name: h2.textContent?.trim(),
      }))
        .filter((day) => day.name?.startsWith('Day '))
        .map((day) => {
          let cover_image =
            day.h2.nextElementSibling?.querySelector('img')?.dataset.src;
          if (!cover_image) {
            cover_image =
              day.h2.parentElement?.parentElement?.querySelector('img')?.dataset
                .src;
          }
          let meals: Meal[] = [];
          let meal: Meal = {
            name: '',
            calories: '',
            foods: [],
          };
          meals.push(meal);
          let node = day.h2.nextElementSibling;
          for (
            ;
            node && node.tagName !== 'H2';
            node = node.nextElementSibling
          ) {
            let text = node.textContent?.trim();
            switch (node.tagName) {
              case 'H3': {
                let match = text?.match(/(.*) \((\d+) calories\)/);
                if (!match) break;
                meal = {
                  name: match[1],
                  calories: match[2],
                  foods: [],
                };
                meals.push(meal);
                break;
              }
              case 'UL': {
                for (let li of node.children) {
                  let text = li.textContent?.trim();
                  if (!text) continue;
                  meal.foods.push({
                    name: text,
                  });
                }
                break;
              }
              case 'P': {
                if (
                  !text ||
                  text.startsWith('Daily Totals') ||
                  text.startsWith('To make') ||
                  text.startsWith('Meal-Prep Tip')
                ) {
                  break;
                }
                meal.foods.push({ name: text });
                break;
              }
            }
          }
          return {
            name: day.name,
            cover_image,
            meals: meals.filter((meal) => meal.name),
          };
        });
      return days;
    });
    return mealPlan;
    // throw new Error('todo');
  }
}
