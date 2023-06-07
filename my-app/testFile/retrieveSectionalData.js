// Buffer Line
const retrieveSectionalData = (data) => {
  let mealArrays = [data.breakfast, data.lunch, data.dinner, data.snack];
  let newVariables = [[], [], [], []];

  for (let mealArray of mealArrays) {
    newVariables[mealArrays.indexOf(mealArray)] = mealArray.map(
      (foodItemInfo) => {
        return foodItemInfo.nutritionInfo;
      }
    );
  }
  let [breakfast, lunch, dinner, snack] = newVariables;
  return newVariables;
};

const data = {
  breakfast: [
    {
      basicInfo: {
        id: 0,
        meal_id: 1,
        meal_time: "breakfast",
        foodName: "bread",
        servingSize: 100,
        sizeUnit: "g",
      },
      nutritionInfo: {
        id: 0,
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
      },
    },
    {
      basicInfo: {
        id: 1,
        meal_id: 1,
        meal_time: "breakfast",
        foodName: "milk",
        servingSize: 200,
        sizeUnit: "g",
      },
      nutritionInfo: {
        id: 1,
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
      },
    },
    {
      basicInfo: {
        id: 2,
        meal_id: 1,
        meal_time: "breakfast",
        foodName: "egg",
        servingSize: 150,
        sizeUnit: "g",
      },
      nutritionInfo: {
        id: 2,
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
      },
    },
  ],
  lunch: [
    {
      basicInfo: {
        id: 3,
        meal_id: 1,
        meal_time: "lunch",
        foodName: "pasta",
        servingSize: 300,
        sizeUnit: "g",
      },
      nutritionInfo: {
        id: 3,
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
      },
    },
    {
      basicInfo: {
        id: 4,
        meal_id: 1,
        meal_time: "lunch",
        foodName: "pork",
        servingSize: 200,
        sizeUnit: "g",
      },
      nutritionInfo: {
        id: 4,
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
      },
    },
    {
      basicInfo: {
        id: 5,
        meal_id: 1,
        meal_time: "lunch",
        foodName: "broccoli",
        servingSize: 200,
        sizeUnit: "g",
      },
      nutritionInfo: {
        id: 5,
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
      },
    },
  ],
  dinner: [
    {
      basicInfo: {
        id: 6,
        meal_id: 1,
        meal_time: "dinner",
        foodName: "rice",
        servingSize: 300,
        sizeUnit: "g",
      },
      nutritionInfo: {
        id: 6,
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
      },
    },
    {
      basicInfo: {
        id: 7,
        meal_id: 1,
        meal_time: "dinner",
        foodName: "beef",
        servingSize: 200,
        sizeUnit: "g",
      },
      nutritionInfo: {
        id: 7,
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
      },
    },
    {
      basicInfo: {
        id: 8,
        meal_id: 1,
        meal_time: "dinner",
        foodName: "carrot",
        servingSize: 150,
        sizeUnit: "g",
      },
      nutritionInfo: {
        id: 8,
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
      },
    },
  ],
  snack: [],
};

let retrievedData = retrieveSectionalData(data);
for (let mealType of retrievedData) {
  for (let basicData of mealType) {
    console.log(basicData);
  }
}
