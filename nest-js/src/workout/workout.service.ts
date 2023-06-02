import { Injectable } from '@nestjs/common';
import { Page, chromium } from 'playwright';
import { InjectKnex, Knex } from 'nestjs-knex';
import { knex } from '../../db';

@Injectable()
export class WorkoutService {
  constructor(@InjectKnex() private knex: Knex) {}
  getWorkoutList() {}

  async scrapWorkoutList() {
    let browser = await chromium.launch({ headless: false });
    let page = await browser.newPage();
    await page.goto('https://www.muscleandstrength.com/workouts/men');
    let workoutList = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll('.cell > .node-image'),
        (div) => {
          let cell = div.parentElement;
          let imageSrc =
            cell.querySelector<HTMLImageElement>('.node-image img')?.dataset
              .src;
          let href = cell.querySelector('a')?.href;
          let title = cell.querySelector('.node-title')?.textContent?.trim();
          return { imageSrc, href, title };
        },
      );
    });

    for (let workout of workoutList) {
      //console.log({ workout });
      let tables = await this.scrapWorkoutDetail(page, workout.href);
    }

    await page.close();
    await browser.close();
  }

  async scrapWorkoutDetail(page: Page, href: string) {
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
}

new WorkoutService(knex).scrapWorkoutList();

// chromium.launch({ headless: false }).then((browser) => {
//   browser.newPage().then((page) => {
//     new WorkoutService().scrapWorkoutDetail(
//       page,
//       'https://www.muscleandstrength.com/workouts/6-day-powerbuilding-split-meal-plan',
//     );
//   });
// });
