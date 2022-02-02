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
import { PAIR_DENY } from "core/constants";

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
        // console.log("===== data || fetchData2.ts =====", data);
        const rows =
          data?.data?.pairs
            ?.filter((row) => {
              return !PAIR_DENY.includes(row.id);
            })
            ?.map((pair) => {
              // const volumeUSD = pair?.volumeUSD === "0" ? pair?.untrackedVolumeUSD : pair?.volumeUSD
              // const oneDayVolumeUSD = pair?.oneDay?.volumeUSD === "0" ? pair?.oneDay?.untrackedVolumeUSD : pair?.oneDay?.volumeUSD
              // const twoDayVolumeUSD = pair?.twoDay?.volumeUSD === "0" ? pair?.twoDay?.untrackedVolumeUSD : pair?.twoDay?.volumeUSD

              const volumeUSD =
                pair?.volumeUSD === "0"
                  ? pair?.untrackedVolumeUSD
                  : pair?.volumeUSD;

              const oneDayVolumeUSD =
                pair?.oneDay?.volumeUSD === "0"
                  ? pair?.oneDay?.untrackedVolumeUSD
                  : pair?.oneDay?.volumeUSD;

              const sevenDayVolumeUSD =
                pair?.sevenDay?.volumeUSD === "0"
                  ? pair?.sevenDay?.untrackedVolumeUSD
                  : pair?.sevenDay?.volumeUSD;

              const oneDayVolume = volumeUSD - oneDayVolumeUSD;
              const oneDayFees = oneDayVolume * 0.003;
              const oneYearFees =
                (oneDayVolume * 0.003 * 365 * 100) / pair.reserveUSD;
              const sevenDayVolume = volumeUSD - sevenDayVolumeUSD;

              return {
                ...pair,
                displayName: `${pair.token0.symbol.replace(
                  "WETH",
                  "ETH"
                )}-${pair.token1.symbol.replace("WETH", "ETH")}`,
                oneDayVolume: !Number.isNaN(oneDayVolume) ? oneDayVolume : 0,
                sevenDayVolume: !Number.isNaN(sevenDayVolume)
                  ? sevenDayVolume
                  : 0,
                oneDayFees: !Number.isNaN(oneDayFees) ? oneDayFees : 0,
                oneYearFees,
              };
            }) || [];

        // console.log("===== rows || fetchData2.ts =====", rows);

        if (rows.length > 0) {
          // console.log("===== rows[0] || fetchData2.ts =====", rows[0]);
          // console.log("Liquidity", currencyFormatter.format(rows[0].reserveUSD));
          // console.log("Volume (24h)", currencyFormatter.format(rows[0].oneDayVolume));
          const _top10 = rows?.map((row) => ({
            name: row.displayName,
            // liquidity: currencyFormatter.format(row.reserveUSD),
            liquidityUSD: row.reserveUSD,
            date: row.timestamp,
          }));
          // console.log("===== _top10 || fetchData2.ts =====", _top10);

          return _top10;
        } else {
          return [];
        }
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
