const reformatMealData = (data) => {
  let breakfastItems = [],
    lunchItems = [],
    dinnerItems = [],
    snackItems = [];
  for (let foodItem of data) {
    switch (foodItem.meal_time) {
      case "breakfast":
        breakfastItems.push(foodItem);
        break;
      case "lunch":
        lunchItems.push(foodItem);
        break;
      case "dinner":
        dinnerItems.push(foodItem);
        break;
      case "snack":
        snackItems.push(foodItem);
        break;
      default:
        break;
    }
  }

  let breakfast = [],
    lunch = [],
    dinner = [],
    snack = [];
  let newVariables = [[], [], [], []];
  let mealArrays = [breakfastItems, lunchItems, dinnerItems, snackItems];

  for (let mealArray of mealArrays) {
    newVariables[mealArrays.indexOf(mealArray)] = mealArray.map((foodItem) => {
      const value = (param) => {
        return foodItem[param];
      };

      const basicInfoParams = [
        "id",
        "meal_id",
        "meal_time",
        //"foodName",
        //"servingSize",
        //"sizeUnit",
      ];
      const nutritionInfoParams = [
        "id",
        "calories",
        "serving_size_g",
        "fat_total_g",
        "fat_saturated_g",
        "protein_g",
        "sodium_mg",
        "potassium_mg",
        "cholesterol_mg",
        "carbohydrates_total_g",
        "fiber_g",
        "sugar_g",
      ];

      let basicInfoDummy = {};
      let nutritionInfoDummy = {};

      basicInfoParams.map((param) => {
        basicInfoDummy[param] = value(param);
      });
      basicInfoDummy["foodName"] = value("name");
      basicInfoDummy["servingSize"] = value("serving_size_g");
      basicInfoDummy["sizeUnit"] = value("saved_sizeUnit");

      nutritionInfoParams.map((param) => {
        nutritionInfoDummy[param] = value(param);
      });

      const basicInfo = basicInfoDummy;
      const nutritionInfo = nutritionInfoDummy;

      return { basicInfo, nutritionInfo };
    });
  }
  [breakfast, lunch, dinner, snack] = newVariables;
  return { breakfast, lunch, dinner, snack };
};

const fakeFoodNutritionData = [
  {
    id: 0,
    meal_id: 1,
    meal_time: "breakfast",
    name: "bread",
    calories: 261.6,
    serving_size_g: 100,
    fat_total_g: 3.4,
    fat_saturated_g: 0.7,
    protein_g: 8.8,
    sodium_mg: 495,
    potassium_mg: 98,
    cholesterol_mg: 0,
    carbohydrates_total_g: 50.2,
    fiber_g: 2.7,
    sugar_g: 5.7,
    saved_sizeUnit: "g",
  },
  {
    id: 1,
    meal_id: 1,
    meal_time: "breakfast",
    name: "milk",
    calories: 102.6,
    serving_size_g: 200,
    fat_total_g: 3.8,
    fat_saturated_g: 2.4,
    protein_g: 7,
    sodium_mg: 105,
    potassium_mg: 201,
    cholesterol_mg: 16,
    carbohydrates_total_g: 9.8,
    fiber_g: 0,
    sugar_g: 0,
    saved_sizeUnit: "g",
  },
  {
    id: 2,
    meal_id: 1,
    meal_time: "breakfast",
    name: "egg",
    calories: 220.6,
    serving_size_g: 150,
    fat_total_g: 14.5,
    fat_saturated_g: 4.7,
    protein_g: 18.8,
    sodium_mg: 209,
    potassium_mg: 299,
    cholesterol_mg: 557,
    carbohydrates_total_g: 1.1,
    fiber_g: 0,
    sugar_g: 0.6,
    saved_sizeUnit: "g",
  },
  {
    id: 3,
    meal_id: 1,
    meal_time: "lunch",
    name: "pasta",
    calories: 467.9,
    serving_size_g: 300,
    fat_total_g: 2.8,
    fat_saturated_g: 0.5,
    protein_g: 17.2,
    sodium_mg: 3,
    potassium_mg: 174,
    cholesterol_mg: 0,
    carbohydrates_total_g: 94,
    fiber_g: 5.4,
    sugar_g: 1.7,
    saved_sizeUnit: "g",
  },
  {
    id: 4,
    meal_id: 1,
    meal_time: "lunch",
    name: "pork",
    calories: 472.3,
    serving_size_g: 200,
    fat_total_g: 27.9,
    fat_saturated_g: 9.9,
    protein_g: 52.5,
    sodium_mg: 115,
    potassium_mg: 439,
    cholesterol_mg: 176,
    carbohydrates_total_g: 0,
    fiber_g: 0,
    sugar_g: 0,
    saved_sizeUnit: "g",
  },
  {
    id: 5,
    meal_id: 1,
    meal_time: "lunch",
    name: "broccoli",
    calories: 69.9,
    serving_size_g: 200,
    fat_total_g: 0.8,
    fat_saturated_g: 0.2,
    protein_g: 4.8,
    sodium_mg: 82,
    potassium_mg: 131,
    cholesterol_mg: 0,
    carbohydrates_total_g: 14.6,
    fiber_g: 6.7,
    sugar_g: 2.8,
    saved_sizeUnit: "g",
  },
  {
    id: 6,
    meal_id: 1,
    meal_time: "dinner",
    name: "rice",
    calories: 382.2,
    serving_size_g: 300,
    fat_total_g: 0.8,
    fat_saturated_g: 0.2,
    protein_g: 8,
    sodium_mg: 3,
    potassium_mg: 127,
    cholesterol_mg: 0,
    carbohydrates_total_g: 85.3,
    fiber_g: 1.2,
    sugar_g: 0.2,
    saved_sizeUnit: "g",
  },
  {
    id: 7,
    meal_id: 1,
    meal_time: "dinner",
    name: "beef",
    calories: 583.8,
    serving_size_g: 200,
    fat_total_g: 39.4,
    fat_saturated_g: 15.6,
    protein_g: 53.2,
    sodium_mg: 127,
    potassium_mg: 412,
    cholesterol_mg: 175,
    carbohydrates_total_g: 0,
    fiber_g: 0,
    sugar_g: 0,
    saved_sizeUnit: "g",
  },
  {
    id: 8,
    meal_id: 1,
    meal_time: "dinner",
    name: "carrot",
    calories: 50.9,
    serving_size_g: 150,
    fat_total_g: 0.3,
    fat_saturated_g: 0,
    protein_g: 1.1,
    sodium_mg: 85,
    potassium_mg: 45,
    cholesterol_mg: 0,
    carbohydrates_total_g: 12.4,
    fiber_g: 4.6,
    sugar_g: 5.2,
    saved_sizeUnit: "g",
  },
];

const formattedData = reformatMealData(fakeFoodNutritionData);

console.log("breakfast");
for (let foodItem of formattedData.breakfast) {
  console.log(foodItem.basicInfo);
  console.log(foodItem.nutritionInfo);
}

console.log("lunch");
for (let foodItem of formattedData.lunch) {
  console.log(foodItem.basicInfo);
  console.log(foodItem.nutritionInfo);
}

console.log("dinner");
for (let foodItem of formattedData.dinner) {
  console.log(foodItem.basicInfo);
  console.log(foodItem.nutritionInfo);
}

console.log("snack");
for (let foodItem of formattedData.snack) {
  console.log(foodItem.basicInfo);
  console.log(foodItem.nutritionInfo);
}
