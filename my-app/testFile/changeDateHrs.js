// Buffer Line
const currentDateTime = new Date();
console.log(currentDateTime);

function addHours(objDate, intHours) {
  const milliSec = objDate.getTime();
  const addHours = intHours * 3600 * 1000;
  return new Date(milliSec + addHours);
}

console.log(addHours(currentDateTime, 8));
