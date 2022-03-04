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
import { customDayDatasQuery, pairsQuery } from "apollo/queries";
// import { PAIR_DENY } from "core/constants";

const fetchData2 = async () => {
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

  const calc = async (client) => {
    return await all_client[`${client}_client`]
      .query({ query: pairsQuery })
      .then((data) => {
        // console.log("===== top10 data || fetchData2.ts =====", data);
        return data.data.pairs;
      });
  };

  const ethereum = await calc("ethereum");
  const bsc = await calc("bsc");
  const moonriver = await calc("moonriver");
  const xdai = await calc("xdai");
  const polygon = await calc("polygon");
  const harmony = await calc("harmony");
  const celo = await calc("celo");
  const fantom = await calc("fantom");
  const arbitrum = await calc("arbitrum");
  const avalanche = await calc("avalanche");

  const result = {
    ethereum,
    bsc,
    moonriver,
    xdai,
    polygon,
    harmony,
    celo,
    fantom,
    arbitrum,
    avalanche,
  };

  // console.log("===== data || fetchData2.ts =====", result);

  return result;
};

export default fetchData2;
