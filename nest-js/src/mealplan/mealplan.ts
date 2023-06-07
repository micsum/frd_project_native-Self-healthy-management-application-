import { Page, chromium } from 'playwright';

type MealPlan = {
  href: string | undefined;
  image: string | undefined;
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

async function collectMealPlanList() {
  let browser = await chromium.launch({ headless: false });
  let page = await browser.newPage();
  await page.goto('https://www.eatingwell.com/category/4286/meal-plans/');

  let mealPlanLists: MealPlan[] = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[data-doc-id]'),
      (a) => ({
        href: a.href,
        image: a.querySelector('img')?.dataset?.src,
        title: a.querySelector('.card__title-text')?.textContent?.trim(),

        // wrong type to scrap, find beeno
        // author: a.querySelector('.card__byline')?.dataset?.byline.trim(),
      }),
    ).filter((plan) => plan.title?.startsWith('7-Day')),
  );
  for (let meal of mealPlanLists) {
    if (!meal.href) continue;
    let match = meal.href.match(/(\d+)\/([a-z-]+)/);
    if (!match) continue;
    let id = match[1];
    let slug = match[2];

    console.log({ meal });
    let tables = await collectMealPlanDetail(page, meal.href);
  }

  await page.close();
  await browser.close();
}

async function collectMealPlanDetail(page: Page, href: string) {
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
          day.h2.parentElement?.querySelector('img')?.dataset.src;
        let meals: Meal[] = [];
        let meal: Meal = {
          name: '',
          calories: '',
          foods: [],
        };
        meals.push(meal);
        let node = day.h2.nextElementSibling;
        for (; node && node.tagName !== 'H2'; node = node.nextElementSibling) {
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
                text.startsWith('To make')
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
    return { published_on, days };
  });
  console.dir(mealPlan, { depth: 20 });
  throw new Error('todo');
}

collectMealPlanList();
