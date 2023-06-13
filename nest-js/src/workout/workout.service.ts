import { Injectable } from '@nestjs/common';
import { Page, chromium } from 'playwright';
import { InjectKnex, Knex } from 'nestjs-knex';
import debug from 'debug';

let log = debug('workout.service.ts');
log.enabled = true;

@Injectable()
export class WorkoutService {
  constructor(@InjectKnex() private knex: Knex) {}
  async getWorkoutList() {
    log('get workout plans');
    let workouts = await this.knex('workout')
      .select('workout.id', 'workout.title', 'workout.cover_image')
      .count('workout_day.id as days')
      .innerJoin('workout_day', 'workout_day.workout_id', 'workout.id')
      .groupBy('workout.id')
      .limit(10);
    return workouts;
  }

  async getWorkoutDetail(workout_id: number) {
    let workout_detail = await this.knex('workout_day')
      .select('id', 'title', 'headers', 'rows')
      .where({ workout_id });

    return workout_detail;
  }

  async scrapWorkoutList() {
    let browser = await chromium.launch({ headless: false });
    let page = await browser.newPage();

    log('scraping workout list...');

    await page.goto('https://www.muscleandstrength.com/workouts/men');
    let workoutList = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll('.cell > .node-image'),
        (div) => {
          let cell = div.parentElement;
          let imageSrc =
            cell?.querySelector<HTMLImageElement>('.node-image img')?.dataset
              .src;
          let href = cell?.querySelector('a')?.href;
          let title = cell?.querySelector('.node-title')?.textContent?.trim();
          if (!imageSrc || !href || !title) return null;
          return { imageSrc, href, title };
        },
      );
    });

    let n = workoutList.length;
    log(`scrapping ${n} workout plans...`);

    let i = 0;
    for (const workout of workoutList) {
      i++;
      log(`scrapping ${i}/${n} workout plan...`);
      if (!workout) continue;
      let days = await this.scrapWorkoutDetail(page, workout.href);
      await this.knex.transaction(async (knex) => {
        // let { id: user_id, name } = { id: 1, name: 'alice' };

        let slug = workout.href.match(/workouts\/([a-z0-9-]+(.html)?)$/)?.[1];
        if (!slug) {
          log('Failed to parse slug, href: ' + workout.href);
          return;
        }

        let row = await knex('workout').select('id').where({ slug }).first();

        if (row) {
          await knex('workout').where({ id: row.id }).update({
            title: workout.title,
            href: workout.href,
            cover_image: workout.imageSrc,
          });
        } else {
          [row] = await knex('workout')
            .insert({
              slug,
              title: workout.title,
              href: workout.href,
              cover_image: workout.imageSrc,
            })
            .returning('id');
        }
        let workout_id = row.id;

        await knex('workout_day').where({ workout_id }).delete();
        if (days.length === 0) {
          await knex('workout').where({ id: workout_id }).delete();
        }

        for (let day of days) {
          await knex('workout_day').insert({
            workout_id,
            title: day.title,
            headers: JSON.stringify(day.headers),
            rows: JSON.stringify(day.rows),
          });
        }
      });
    }

    log(`scrapped ${n} workout plans.`);

    await page.close();
    await browser.close();
  }

  async scrapWorkoutDetail(page: Page, href: string) {
    await page.goto(href);
    let days = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h4 + table'), (table) => {
        let title = table.previousElementSibling?.textContent?.trim() || '';
        let headers: string[] = [];
        let rows: string[][] = [];
        table.querySelectorAll('tr').forEach((tr) => {
          let cols = Array.from(
            tr.querySelectorAll('th'),
            (th) => th.textContent?.trim() || '',
          );
          if (cols.length > 0) {
            headers = cols;
            rows = [];
            return;
          }

          cols = Array.from(
            tr.querySelectorAll('td strong'),
            (th) => th.textContent?.trim() || '',
          );
          if (cols.length > 0) {
            headers = cols;
            rows = [];
            return;
          }

          cols = Array.from(
            tr.querySelectorAll('td'),
            (td) => td.textContent?.trim() || '',
          );
          if (cols.length > 0) {
            rows.push(cols);
          }
        });
        return { title, headers, rows };
      }).filter(
        (table) =>
          table.title && table.headers.length > 0 && table.rows.length > 0,
      );
    });
    return days;
  }
}

//new WorkoutService(knex).scrapWorkoutList();

// chromium.launch({ headless: false }).then((browser) => {
//   browser.newPage().then((page) => {
//     new WorkoutService().scrapWorkoutDetail(
//       page,
//       'https://www.muscleandstrength.com/workouts/6-day-powerbuilding-split-meal-plan',
//     );
//   });
// });
