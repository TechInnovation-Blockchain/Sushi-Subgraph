const callEpoch = (year) => {
  const months = [];
  const startDate = new Date(year, 1, 1);
  const endDate = new Date(year, 12, 31);
  let currentDate = startDate;

  while (currentDate <= endDate) {
    if (currentDate >= startDate && currentDate <= endDate) {
      months.push({
        day: `${currentDate.getUTCDate()}-${
          currentDate.getUTCMonth() + 1
        }-${currentDate.getUTCFullYear()}`,
        timestamp: currentDate.getTime(),
      });
      const mCal = 2;
      months.push({
        day: `${1}-${
          currentDate.getUTCMonth() + mCal < 13 ? currentDate.getUTCMonth() + mCal : 1
        }-${
          currentDate.getUTCMonth() + mCal < 13
            ? currentDate.getUTCFullYear()
            : currentDate.getUTCFullYear() + 1
        }`,
        timestamp: currentDate.getTime() + 86400000,
      });
    }
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return months;
};

const getEpochByYear = (year) => {
  const result = [callEpoch(year - 1)[23], ...callEpoch(year)];
  result.pop();
  return result;
};

const year = new Date().getUTCFullYear();
const month = new Date().getUTCMonth() + 1;
const y1 = getEpochByYear(year);
const y2 = getEpochByYear(year - 1).reverse();
const y3 = getEpochByYear(year - 2).reverse();

const allEpochsConcat = y1
  .slice(0, month * 2)
  .reverse()
  .concat(y2, y3)
  .slice(0, 30);

const allEpochs = [];

for (let i = 0; i < allEpochsConcat.length; i += 2) {
  allEpochs.push([
    allEpochsConcat[i + 1].timestamp / 1000 - 86400,
    allEpochsConcat[i].timestamp / 1000 - 1,
  ]);
}

// console.log(allEpochs);
// console.log("allEpochs || timestamp", new Date(allEpochs[0][1] * 1000));

export default allEpochs;
