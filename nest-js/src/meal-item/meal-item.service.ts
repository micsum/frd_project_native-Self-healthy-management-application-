// Buffer Line
import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateMealItemDto } from './dto/create-meal-item.dto';
import { UpdateMealItemDto } from './dto/update-meal-item.dto';
import { createFakeFoodObject } from './utils/fakeNutritionData';
import { APIFoodItemNutritionInfo } from './utils/mealPageType';

@Injectable()
export class MealItemService {
  nutritionContentKey: string[];
  //@ts-ignore
  constructor(@InjectKnex() private knex: Knex) {
    this.nutritionContentKey = [
      'calories',
      'fat_total_g',
      'fat_saturated_g',
      'protein_g',
      'sodium_mg',
      'potassium_mg',
      'cholesterol_mg',
      'carbohydrates_total_g',
      'fiber_g',
      'sugar_g',
    ];
  }

  private generatePassedDate(days: number, currentDate: string) {
    const nDaysAgo = (date: Date, n: number) => {
      return new Date(date.getTime() - n * 24 * 3600 * 1000);
    };
    let dateArray: Date[] = [];
    for (let i = 0; i < days; i++) {
      const date = nDaysAgo(new Date(currentDate), days - 1 - i);
      dateArray.push(date);
    }
    return dateArray;
  }

  async getMealData(userID: number, date: string) {
    const mealDataResult = await this.knex('meal_food_item')
      .join('meal_input_record', {
        'meal_input_record.id': 'meal_food_item.meal_id',
      })
      .select(
        'meal_input_record.id as mealInputID',
        'meal_food_item.id as foodItemID',
        '*',
      )
      .where('meal_input_record.user_id', '=', userID)
      .andWhere('meal_input_record.date_of_meal', '=', new Date(date));

    const mealData = mealDataResult.map((foodItem) => {
      //@ts-ignore
      const { date_of_meal, user_id, mealInputID, foodItemID, ...clone } =
        foodItem;
      return { ...clone, id: foodItemID };
    });
    return { mealData };
  }

  async createNewItem(
    userID: number,
    date: Date,
    foodItemBasicInfo: CreateMealItemDto,
  ) {
    const { meal_id, meal_time, foodName, servingSize, sizeUnit } =
      foodItemBasicInfo;
    let nutritionInfo: APIFoodItemNutritionInfo[] = [];
    let itemNutritionInfo: any = {};

    try {
      const nutritionURL = `https://api.api-ninjas.com/v1/nutrition?query=${servingSize}${sizeUnit} ${foodName}`;
      const res = await fetch(nutritionURL, {
        method: 'GET',
        headers: {
          'X-Api-Key': `${process.env.API_KEY}`,
        },
      });
      nutritionInfo = await res.json();
    } catch (error) {
      console.log(error);
      return { error: 'API Error' };
    }

    let newServingSize: number;
    switch (sizeUnit) {
      case 'kg':
        newServingSize = servingSize * 1000;
        break;
      case 'lb':
        newServingSize = servingSize * 453.592;
        break;
      default:
        newServingSize = servingSize;
    }
    newServingSize = parseFloat(newServingSize.toFixed(2));
    if (nutritionInfo.length === 0) {
      itemNutritionInfo = {
        ...createFakeFoodObject(foodItemBasicInfo),
      };
    } else {
      itemNutritionInfo = {
        ...nutritionInfo[0],
      };
    }
    itemNutritionInfo = {
      ...itemNutritionInfo,
      serving_size_g: newServingSize,
      saved_size_unit: sizeUnit,
      name: foodItemBasicInfo.foodName,
    };

    let mealID = meal_id;
    if (mealID === -1) {
      let idResult = await this.knex('meal_input_record')
        .select('*')
        .where({ date_of_meal: date })
        .andWhere({ meal_time });

      if (idResult.length !== 0) {
        mealID = idResult[0].id;
      } else {
        let [{ id }] = await this.knex('meal_input_record')
          .insert({ date_of_meal: date, user_id: userID, meal_time })
          .returning('id');
        mealID = id;
      }
    }
    itemNutritionInfo = {
      ...itemNutritionInfo,
      meal_id: mealID,
    };

    const existingResult = await this.knex
      .select('*')
      .from('meal_food_item')
      .where({ meal_id: mealID })
      .andWhere({ name: foodItemBasicInfo.foodName });

    if (existingResult.length !== 0) {
      return {
        error: `${foodName} already exists in ${meal_time}`,
      };
    }

    const [{ id }] = await this.knex('meal_food_item')
      .insert(itemNutritionInfo)
      .returning('id');

    return { itemInfo: { ...itemNutritionInfo, id, meal_time } };
  }

  async updateExistingItem(foodItemFullInfo: UpdateMealItemDto) {
    const { id, meal_id } = foodItemFullInfo;

    const existingResult = await this.knex
      .select('*')
      .from('meal_food_item')
      .where({ meal_id })
      .andWhere({ id });

    if (existingResult.length === 0) {
      return {
        error: `This item does not exist in ${foodItemFullInfo.meal_time}`,
      };
    }

    const { meal_time, name, ...clone } = foodItemFullInfo;

    await this.knex('meal_food_item').update(clone).where({ id });

    return {};
  }

  async deleteExistingItem(foodItemBasicInfo: CreateMealItemDto) {
    const { id, meal_id, foodName } = foodItemBasicInfo;

    const existingResult = await this.knex
      .select('*')
      .from('meal_food_item')
      .where({ meal_id })
      .andWhere({ name: foodName });

    if (existingResult.length === 0) {
      return {
        error: `${foodItemBasicInfo.foodName} does not exist in ${foodItemBasicInfo.meal_time}`,
      };
    }

    await this.knex('meal_food_item').where({ id }).del();
    return {};
  }

  async getPastItemNutrition(userID: number, date: string, days: number) {
    const dateArray = this.generatePassedDate(days, date);
    const itemNutritionResult = await this.knex('meal_input_record')
      .join('meal_food_item', {
        'meal_food_item.meal_id': 'meal_input_record.id',
      })
      .select(
        'meal_input_record.id as mealInputID',
        'meal_food_item.id as foodItemID',
        '*',
      )
      .where({ 'meal_input_record.user_id': userID })
      .whereIn('meal_input_record.date_of_meal', dateArray);

    let dateSortedObject: any = {};
    dateArray.map((date: Date) => {
      dateSortedObject[date.toISOString().split('T')[0]] = [];
    });

    for (let foodItem of itemNutritionResult) {
      const dateOfMeal: Date = foodItem.date_of_meal;

      dateSortedObject[
        new Date(new Date(dateOfMeal).getTime() + 8 * 3600000)
          .toISOString()
          .split('T')[0]
      ].push(foodItem);
    }

    const dailyNutritionResult: any = [];
    const dailyNutritionObject: any = {};
    for (let nutritionKey of this.nutritionContentKey) {
      dailyNutritionObject[nutritionKey] = 0;
    }

    for (let date of dateArray) {
      const nutritionObject: any = { ...dailyNutritionObject };
      for (let foodItem of dateSortedObject[date.toISOString().split('T')[0]]) {
        for (let nutritionKey of this.nutritionContentKey) {
          nutritionObject[nutritionKey] += parseFloat(foodItem[nutritionKey]);
        }
      }
      const outputObject = { ...nutritionObject, date };
      dailyNutritionResult.push(outputObject);
    }

    return { dailyNutritionResult };
  }
}
