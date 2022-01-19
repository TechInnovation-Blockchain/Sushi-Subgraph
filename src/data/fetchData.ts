import { networkItems } from 'data';
import {
  ethereum_client,
  bsc_client,
  moonriver_client,
  xdai_client,
  polygon_client,
  harmony_client,
  celo_client,
  fantom_client,
  arbitrum_client,
  avalanche_client,
} from "apollo/client";
import { customDayDatasQuery } from "apollo/queries";

const fetchData = async () => {
  // TODO: add query on the fetchData function for new network client
  const ethereum_res = await ethereum_client.query({ query: customDayDatasQuery });
  const bsc_res = await bsc_client.query({ query: customDayDatasQuery });
  const moonriver_res = await moonriver_client.query({ query: customDayDatasQuery });
  const xdai_res = await xdai_client.query({ query: customDayDatasQuery });
  const polygon_res = await polygon_client.query({ query: customDayDatasQuery });
  const harmony_res = await harmony_client.query({ query: customDayDatasQuery });
  const celo_res = await celo_client.query({ query: customDayDatasQuery });
  const fantom_res = await fantom_client.query({ query: customDayDatasQuery });
  const arbitrum_res = await arbitrum_client.query({ query: customDayDatasQuery });
  const avalanche_res = await avalanche_client.query({ query: customDayDatasQuery });

  const getDateArr = (data) => data.map((item) => item.date);

  // TODO: assign variable for new network client
  const ethereumDate = getDateArr(ethereum_res.data.dayDatas);
  const bscDate = getDateArr(bsc_res.data.dayDatas);
  const moonriverDate = getDateArr(moonriver_res.data.dayDatas);
  const xdaiDate = getDateArr(xdai_res.data.dayDatas);
  const polygonDate = getDateArr(polygon_res.data.dayDatas);
  const harmonyDate = getDateArr(harmony_res.data.dayDatas);
  const celoDate = getDateArr(celo_res.data.dayDatas);
  const fantomDate = getDateArr(fantom_res.data.dayDatas);
  const arbitrumDate = getDateArr(arbitrum_res.data.dayDatas);
  const avalancheDate = getDateArr(avalanche_res.data.dayDatas);

  // TODO: add variable of new network client
  const uniqueArr = Array.from(
    new Set([
      ...ethereumDate,
      ...bscDate,
      ...moonriverDate,
      ...xdaiDate,
      ...polygonDate,
      ...harmonyDate,
      ...celoDate,
      ...fantomDate,
      ...arbitrumDate,
      ...avalancheDate,
    ])
  );

  const getNewData = (oldData) => {
    return uniqueArr.map((item) => {
      const value = oldData.find((_item) => _item.date === item);

      return {
        date: item,
        liquidityUSD: value ? Number(value.liquidityUSD) : 0,
        volumeUSD: value ? Number(value.volumeUSD) : 0,
        strDate: new Date(item * 1000),
      };
    });
  };
  // TODO: assign variable for new network client's data
  const ethereumNew = getNewData(ethereum_res.data.dayDatas);
  const bscNew = getNewData(bsc_res.data.dayDatas);
  const moonriverNew = getNewData(moonriver_res.data.dayDatas);
  const xdaiNew = getNewData(xdai_res.data.dayDatas);
  const polygonNew = getNewData(polygon_res.data.dayDatas);
  const harmonyNew = getNewData(harmony_res.data.dayDatas);
  const celoNew = getNewData(celo_res.data.dayDatas);
  const fantomNew = getNewData(fantom_res.data.dayDatas);
  const arbitrumNew = getNewData(arbitrum_res.data.dayDatas);
  const avalancheNew = getNewData(avalanche_res.data.dayDatas);

  return {
    ethereum: getNewData(ethereum_res.data.dayDatas),
    bsc: bscNew,
    moonriver: moonriverNew,
    xdai: xdaiNew,
    polygon: polygonNew,
    harmony: harmonyNew,
    celo: celoNew,
    fantom: fantomNew,
    arbitrum: arbitrumNew,
    avalanche: avalancheNew,
  }
};

export default fetchData;
