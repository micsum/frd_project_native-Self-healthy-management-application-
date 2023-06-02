import { Page, chromium } from 'playwright';

async function scrapMealPlanList() {
  let browser = await chromium.launch({ headless: false });
  let page = await browser.newPage();
  await page.goto('https://www.verywellfit.com/meal-plans-6386423');

  let mealPlanList = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll('a[data-cta="Read Now ▸"]'),
      (a: any) => ({
        id: a.href.match(/-(\d+)$/)[1],
        href: a.href,
        image: a.querySelector('img')?.dataset.src,
        title: a.querySelector('.card__title-text').textContent,
      }),
    );
  });
  for (let meal of mealPlanList) {
    console.log({ meal });
    let tables = await scrapMealPlanDetail(page, meal.href);
  }

  await page.close();
  await browser.close();
}

async function scrapMealPlanDetail(page: Page, href: string) {
  await page.goto(href);
  let tables = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h4 + table'), (table) => {
      let title = table.previousElementSibling.textContent?.trim();
      let headers: string[] = [];
      let rows: string[][] = [];
      table.querySelectorAll('tr').forEach((tr) => {
        let cols = Array.from(tr.querySelectorAll('th'), (th) =>
          th.textContent?.trim(),
        );
        if (cols.length > 0) {
          headers = cols;
          rows = [];
          return;
        }

        cols = Array.from(tr.querySelectorAll('td strong'), (th) =>
          th.textContent?.trim(),
        );
        if (cols.length > 0) {
          headers = cols;
          rows = [];
          return;
        }

        cols = Array.from(tr.querySelectorAll('td'), (td) =>
          td.textContent.trim(),
        );
        if (cols.length > 0) {
          rows.push(cols);
        }
      });
      return { title, headers, rows };
    });
  });
  console.dir({ tables }, { depth: 20 });
  return tables;
}

scrapMealPlanList();
