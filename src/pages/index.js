import {
  AppShell,
  AreaChart,
  BarChart,
  // PairTable,
  // PoolTable,
  // Search,
  // TokenTable,
} from "app/components";
import { Box, Grid, Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import {
  dayDatasQuery,
  getApollo,
  getDayData,
  getEthPrice,
  getOneDayEthPrice,
  getPairs,
  getPools,
  getSevenDayEthPrice,
  getTokens,
  // pairsQuery,
  // poolsQuery,
  // tokensQuery,
  useInterval,
} from "app/core";

import Head from "next/head";
import { ParentSize } from "@visx/responsive";
import { useQuery } from "@apollo/client";
import NewGraph from "components/_newGraph";
import NewGraph2 from "components/_newGraph2";
import NewGraph3 from "components/_newGraph3";
// import {
//   SELECTED_ADDRESS,
//   etherscan,
//   arbiscan,
//   celo,
//   harmony,
//   moonscan,
//   moonriver,
//   xdai,
// } from "config";

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
} from "../apollo/client";
import { customDayDatasQuery } from "../apollo/queries";

function IndexPage() {
  // const allAddress = {etherscan, arbiscan, celo, harmony, moonscan, moonriver, xdai};
  const [sidebarOptions, setSidebarOptions] = React.useState({
    ethereum: true,
    bsc: false,
    moonriver: false,
    xdai: false,
    polygon: false,
    harmony: false,
    celo: false,
    fantom: false,
    arbitrum: false,
  });
  const [allData, setAllData] = useState({
    ethereum: null,
    bsc: null,
    moonriver: null,
    xdai: null,
    polygon: null,
    harmony: null,
    celo: null,
    fantom: null,
    arbitrum: null,
  });

  const {data: { dayDatas }} = useQuery(dayDatasQuery);

  useEffect(() => {
    if (dayDatas === undefined) return;

    const fetchData = async () => {
      const ethereum_res = await ethereum_client.query({ query: customDayDatasQuery });
      const bsc_res = await bsc_client.query({ query: customDayDatasQuery });
      const moonriver_res = await moonriver_client.query({ query: customDayDatasQuery });
      const xdai_res = await xdai_client.query({ query: customDayDatasQuery });
      const polygon_res = await polygon_client.query({ query: customDayDatasQuery });
      const harmony_res = await harmony_client.query({ query: customDayDatasQuery });
      const celo_res = await celo_client.query({ query: customDayDatasQuery });
      const fantom_res = await fantom_client.query({ query: customDayDatasQuery });
      const arbitrum_res = await arbitrum_client.query({ query: customDayDatasQuery });

      // console.log("dayDatas:::", dayDatas);
      // console.log("RESSS:::", ethereum_res.data);
      // console.log("RESSS:::", bsc_res.data);

      // console.log("ethereum_res", ethereum_res?.data);

      setAllData({
        ...allData,
        ethereum: ethereum_res.data.dayDatas,
        bsc: bsc_res.data.dayDatas,
        moonriver: moonriver_res.data.dayDatas,
        xdai: xdai_res.data.dayDatas,
        polygon: polygon_res.data.dayDatas,
        harmony: harmony_res.data.dayDatas,
        celo: celo_res.data.dayDatas,
        fantom: fantom_res.data.dayDatas,
        arbitrum: arbitrum_res.data.dayDatas,
      });
    };
    fetchData();
    // }, []);
  }, [dayDatas]);

  // const {
  //   data: { tokens },
  // } = useQuery(tokensQuery);

  // const {
  //   data: { pairs },
  // } = useQuery(pairsQuery);

  // const {
  //   data: { pools },
  // } = useQuery(poolsQuery, {
  //   context: {
  //     clientName: "masterchef",
  //   },
  // });

  useInterval(
    () =>
      Promise.all([
        getPairs,
        getPools,
        getTokens,
        getDayData,
        getOneDayEthPrice,
        getSevenDayEthPrice,
      ]),
    60000
  );

  const [liquidity, volume] = dayDatas
    .filter((d) => d.liquidityUSD !== "0")
    .reduce(
      (previousValue, currentValue) => {
        previousValue[0].unshift({
          date: currentValue.date,
          value: parseFloat(currentValue.liquidityUSD),
        });
        previousValue[1].unshift({
          date: currentValue.date,
          value: parseFloat(currentValue.volumeUSD),
        });
        return previousValue;
      },
      [[], []]
    );

  return (
    <AppShell
      sidebarOptions={sidebarOptions}
      setSidebarOptions={setSidebarOptions}
    >
      <Head>
        <title>Dashboard | Crypto Analytics</title>
      </Head>
      {/* <Box mb={3}>
        <Search pairs={pairs} tokens={tokens} />
      </Box> */}

      {allData.ethereum !== null && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <Paper variant="outlined" style={{ height: 300 }}>
              <ParentSize>
                {({ width, height }) => (
                  <AreaChart
                    title="Liquidity2"
                    width={width}
                    height={height}
                    data={liquidity}
                    // data={allData.ethereum?.liquidityETH}
                    margin={{ top: 125, right: 0, bottom: 0, left: 0 }}
                    tooltipDisabled
                    overlayEnabled
                  />
                )}
              </ParentSize>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper
              variant="outlined"
              style={{ height: 300, position: "relative" }}
            >
              <ParentSize>
                {({ width, height }) => (
                  <BarChart
                    title="Volume"
                    width={width}
                    height={height}
                    data={volume}
                    // data={allData.ethereum?.volumeETH}
                    margin={{ top: 125, right: 0, bottom: 0, left: 0 }}
                    tooltipDisabled
                    overlayEnabled
                  />
                )}
              </ParentSize>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <NewGraph sidebarOptions={sidebarOptions} allData={allData} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <NewGraph2
              liveData={allData.ethereum?.liquidityETH}
              allData={allData}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <NewGraph3 />
          </Grid>
        </Grid>
      )}
    </AppShell>
  );
}

export async function getStaticProps() {
  const client = getApollo();

  await getDayData(client);
  await getEthPrice(client);
  await getOneDayEthPrice(client);
  await getSevenDayEthPrice(client);
  await getTokens(client);
  await getPairs(client);
  await getPools(client);

  console.log("client.cache.extract()", client.cache.extract())

  return {
    props: {
      initialApolloState: client.cache.extract(),
      // initialApolloState: [],
    },
    revalidate: 1,
  };
}

export default IndexPage;
