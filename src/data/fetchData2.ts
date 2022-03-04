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
import { pairsQueryByMonth, pairsQuery } from "apollo/queries";
import allEpochs from "utils/allEpochs";
import timestampToDate from "utils/timestampToDate";
// import { PAIR_DENY } from "core/constants";

const fetchData2 = async () => {
  // console.log("fetchData2 || Top10Page", timestampToDate(allEpochs[0][1]));

  const all_client = {
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
  };

  let res = [];
  const calc2 = async (client) => {
    res = [];
    allEpochs.forEach(async (epoch) => {
      const _res = await all_client[`${client}_client`]
        .query({ query: pairsQueryByMonth(epoch[0], epoch[1]) })
        .then((data) => {
          return data.data.pairs;
        });
      const obj = {
        data: _res,
        time: [timestampToDate(epoch[0]), timestampToDate(epoch[1])],
      };
      // per month data
      // console.log(timestampToDate(epoch[0]), obj);


      res.push(obj);
    });

    // let result = [];

    // res.forEach((item) => {
    //   result = result.concat(item);
    // });

    // const abc = await res;
    // console.log("res", abc[0]);

    // return result;
    return res;
  };

  const calc3 = async (client) => {
    const res = await Promise.all(
      allEpochs.map(async (epoch) => {
        return await all_client[`${client}_client`]
          .query({ query: pairsQueryByMonth(epoch[0], epoch[1]) })
          .then((data) => {
            return {
              data: data.data.pairs,
              time: [timestampToDate(epoch[0]), timestampToDate(epoch[1])],
            }
          });
      })
    );

    // console.log("res ->", res);

    // console.log(client, result);

    return res;
  };

  const calc = async (client) => {
    const res = await Promise.all(
      allEpochs.map(async (epoch) => {
        return await all_client[`${client}_client`]
          .query({ query: pairsQueryByMonth(epoch[0], epoch[1]) })
          .then((data) => {
            return data.data.pairs;
          });
      })
    );

    // console.log("res ->", res);

    let result = [];

    res.forEach((item) => {
      result = result.concat(item);
    });

    // console.log(client, result);

    return result;
  };

  // const ethereum = await calc("ethereum");
  // const bsc = await calc("bsc");
  // const moonriver = await calc("moonriver");
  // const xdai = await calc("xdai");
  // const polygon = await calc("polygon");
  // const harmony = await calc("harmony");
  // const celo = await calc("celo");
  // const fantom = await calc("fantom");
  // const arbitrum = await calc("arbitrum");
  // const avalanche = await calc("avalanche");

  const ethereum = await calc3("ethereum");
  const bsc = await calc3("bsc");
  const moonriver = await calc3("moonriver");
  const xdai = await calc3("xdai");
  const polygon = await calc3("polygon");
  const harmony = await calc3("harmony");
  const celo = await calc3("celo");
  const fantom = await calc3("fantom");
  const arbitrum = await calc3("arbitrum");
  const avalanche = await calc3("avalanche");

  // const ethereum2 = await calc2("ethereum");
  // const bsc2 = await calc2("bsc");
  // const moonriver2 = await calc2("moonriver");
  // const xdai2 = await calc2("xdai");
  // const polygon2 = await calc2("polygon");
  // const harmony2 = await calc2("harmony");
  // const celo2 = await calc2("celo");
  // const fantom2 = await calc2("fantom");
  // const arbitrum2 = await calc2("arbitrum");
  // const avalanche2 = await calc2("avalanche");

  // console.log("fetchData2 || ethereum2", ethereum2);

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

  console.log("===== data || fetchData2.ts =====", result);

  return result;
};

export default fetchData2;
