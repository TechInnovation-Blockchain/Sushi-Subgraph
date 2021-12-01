const {
  ethereum,
  bsc,
  moonriver,
  xdai,
  polygon,
  harmony,
  celo,
  fantom,
  arbitrum,
} = require("./data");

const getDateArr = (data) => data.map((item) => item.date);

const getNewData = (oldData, selectedItem) => {
  return uniqueArr.map((item) => {
    const value = oldData.find((_item) => _item.date === item);

    return {
      date: item,
      value: value ? Number(value[selectedItem]) : 0,
      strDate: new Date(item * 1000),
    };
  });
};

const ethereumDate = getDateArr(ethereum)
const bscDate = getDateArr(bsc)
const moonriverDate = getDateArr(moonriver)
const xdaiDate = getDateArr(xdai)
const polygonDate = getDateArr(polygon)
const harmonyDate = getDateArr(harmony)
const celoDate = getDateArr(celo)
const fantomDate = getDateArr(fantom)
const arbitrumDate = getDateArr(arbitrum)

const uniqueArr = [
  ...new Set([
    ...ethereumDate,
    ...bscDate,
    ...moonriverDate,
    ...xdaiDate,
    ...polygonDate,
    ...harmonyDate,
    ...celoDate,
    ...fantomDate,
    ...arbitrumDate,
  ]),
];

const ethereumNew = getNewData(ethereum, "liquidityUSD");
const bscNew = getNewData(bsc, "liquidityUSD");
const moonriverNew = getNewData(moonriver, "liquidityUSD");
const xdaiNew = getNewData(xdai, "liquidityUSD");
const polygonNew = getNewData(polygon, "liquidityUSD");
const harmonyNew = getNewData(harmony, "liquidityUSD");
const celoNew = getNewData(celo, "liquidityUSD");
const fantomNew = getNewData(fantom, "liquidityUSD");
const arbitrumNew = getNewData(arbitrum, "liquidityUSD");

console.log("data", ethereumNew);
console.log("bscData:::", bscNew);
