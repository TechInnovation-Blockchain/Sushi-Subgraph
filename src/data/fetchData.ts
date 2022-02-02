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
  const all_client = {
    ethereum_client: ethereum_client,
    bsc_client: bsc_client,
    moonriver_client: moonriver_client,
    xdai_client: xdai_client,
    polygon_client: polygon_client,
    harmony_client: harmony_client,
    celo_client: celo_client,
    fantom_client: fantom_client,
    arbitrum_client: arbitrum_client,
    avalanche_client: avalanche_client,
  };

  const res = (client) => all_client[`${client}_client`].query({ query: customDayDatasQuery });
  const getDateArr = (data) => data.map((item) => item.date);

  // TODO: add query on the fetchData function for new network client
  const ethereum_res = await res("ethereum");
  const bsc_res = await res("bsc");
  const moonriver_res = await res("moonriver");
  const xdai_res = await res("xdai");
  const polygon_res = await res("polygon");
  const harmony_res = await res("harmony");
  const celo_res = await res("celo");
  const fantom_res = await res("fantom");
  const arbitrum_res = await res("arbitrum");
  const avalanche_res = await res("avalanche");

  // TODO: add variable of new network client
  const uniqueArr = Array.from(
    new Set([
      ...getDateArr(ethereum_res.data.dayDatas),
      ...getDateArr(bsc_res.data.dayDatas),
      ...getDateArr(moonriver_res.data.dayDatas),
      ...getDateArr(xdai_res.data.dayDatas),
      ...getDateArr(polygon_res.data.dayDatas),
      ...getDateArr(harmony_res.data.dayDatas),
      ...getDateArr(celo_res.data.dayDatas),
      ...getDateArr(fantom_res.data.dayDatas),
      ...getDateArr(arbitrum_res.data.dayDatas),
      ...getDateArr(avalanche_res.data.dayDatas),
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
  return {
    ethereum: getNewData(ethereum_res.data.dayDatas),
    bsc: getNewData(bsc_res.data.dayDatas),
    moonriver: getNewData(moonriver_res.data.dayDatas),
    xdai: getNewData(xdai_res.data.dayDatas),
    polygon: getNewData(polygon_res.data.dayDatas),
    harmony: getNewData(harmony_res.data.dayDatas),
    celo: getNewData(celo_res.data.dayDatas),
    fantom: getNewData(fantom_res.data.dayDatas),
    arbitrum: getNewData(arbitrum_res.data.dayDatas),
    avalanche: getNewData(avalanche_res.data.dayDatas),
  };
};

export default fetchData;
