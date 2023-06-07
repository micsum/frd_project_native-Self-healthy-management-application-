// Buffer Line
const unitConversion = (oldSize, oldUnit, newSize, newUnit) => {
  let unitConversion = 1;
  if (oldUnit !== newUnit) {
    const unitConversionList = [
      { from: "g", to: "kg", factor: 1000 },
      { from: "kg", to: "lb", factor: 1 / 2.2 },
      { from: "lb", to: "g", factor: 1 / 453.592 },
    ];

    for (let i = 0; i < 6; i++) {
      const { from, to, factor } = unitConversionList[i % 3];
      if (oldUnit === from) {
        unitConversion *= factor;
        oldUnit = to;
      }
      if (newUnit === oldUnit) {
        break;
      }
    }
  }
  return parseFloat(((newSize * unitConversion) / oldSize).toFixed(4));
};

console.log(`150g => 300g : ${unitConversion(150, "g", 300, "g")}`);
console.log(`200g => 1kg : ${unitConversion(200, "g", 1, "kg")}`);
console.log(`2kg => 400g : ${unitConversion(2, "kg", 400, "g")}`);
console.log(`100g => 1lb : ${unitConversion(100, "g", 1, "lb")}`);
console.log(`2lb => 1kg : ${unitConversion(2, "lb", 1, "kg")}`);
