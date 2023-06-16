// Buffer Line
const dummyObject = {
  fruit: "apple",
  quantity: 5,
  bought: true,
  number1: 3,
  number2: 6,
};

for (let key in dummyObject) {
  console.log(`key ${key} : ${dummyObject[key]}`);
}

const newArray = Object.entries(dummyObject).map(([key, value]) => {
  return { label: key, value };
});

for (let entries of newArray) {
  console.log(`${entries.label} ${entries.value}`);
}

const newObject = {
  defgh: 5,
  abcde: 2,
  cdefg: 4,
  bcdef: 3,
  apple: 1,
};

// {
//   1: "apple",
//   4: "grapes",
//   2: "orange",
//   6: "tomato",
//   5: "starfruit",
//   3: "pear",
// };

const newNewArray = Object.entries(newObject).map(([key, value]) => {
  return { label: key, value };
});

for (let entries of newNewArray) {
  console.log(`${entries.label} ${entries.value}`);
}

const newNewObject = {
  defgh: 7,
  abcde: 8,
  cdefg: 9,
  bcdef: 10,
  apple: 12,
  orange: 13,
};
