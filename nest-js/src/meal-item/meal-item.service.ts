// Buffer Line
import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateMealItemDto } from './dto/create-meal-item.dto';
import { UpdateMealItemDto } from './dto/update-meal-item.dto';
import { createFakeFoodObject } from './utils/fakeNutritionData';
import { APIFoodItemNutritionInfo } from './utils/type';

const API_KEY = '';

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

  async createNewItem(date: Date, foodItemBasicInfo: CreateMealItemDto) {
    console.log('service', foodItemBasicInfo);
    const { meal_id, meal_time, foodName, servingSize, sizeUnit } =
      foodItemBasicInfo;
    let nutritionInfo: APIFoodItemNutritionInfo[] = [];
    let itemNutritionInfo: any = {};

    // try {

    //   const nutritionURL = `https://api.api-ninjas.com/v1/nutrition?query=${servingSize}${sizeUnit} ${foodName}`;
    //   const res = await fetch(nutritionURL, {
    //     method: 'GET',
    //     headers: {
    //       'X-Api-Key': API_KEY,
    //     },
    //   });
    //   nutritionInfo = await res.json();
    // } catch (error) {
    //   console.log(error);
    //   return { error: 'API Error' };
    // }

    if (nutritionInfo.length === 0) {
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
      itemNutritionInfo = {
        ...createFakeFoodObject(foodItemBasicInfo),
        serving_size_g: newServingSize,
        saved_size_unit: sizeUnit,
      };
    } else {
      itemNutritionInfo = {
        ...nutritionInfo[0],
        saved_size_unit: sizeUnit,
        serving_size_g: sizeUnit,
      };
    }
    console.log(itemNutritionInfo);

    let mealID = meal_id;
    if (mealID === -1) {
      let [{ id }] = await this.knex('meal_input_record')
        .insert({ date_of_meal: date, userID: '??', meal_time })
        .returning('id');
      mealID = id;
    }

    const existingResult = await this.knex
      .select('*')
      .from('meal_food_item')
      .where({ meal_id: mealID })
      .andWhere({ foodName: foodItemBasicInfo.foodName });

    if (existingResult.length !== 0) {
      return {
        error: `${foodItemBasicInfo.foodName} already exists in ${foodItemBasicInfo.meal_time}`,
      };
    }

    const [{ id }] = await this.knex('meal_food_item')
      .insert(itemNutritionInfo)
      .returning('id');

    return { id };
  }

  async deleteExistingItem(foodItemBasicInfo: CreateMealItemDto) {
    const { id, meal_id, foodName } = foodItemBasicInfo;
    console.log(id, meal_id, foodName);

    const existingResult = await this.knex
      .select('*')
      .from('meal_food_item')
      .where({ meal_id })
      .andWhere({ foodName });

    if (existingResult.length === 0) {
      return {
        error: `${foodItemBasicInfo.foodName} does not exist in ${foodItemBasicInfo.meal_time}`,
      };
    }

    await this.knex('meal_food_item').where({ id }).del();
    return {};
  }
}
