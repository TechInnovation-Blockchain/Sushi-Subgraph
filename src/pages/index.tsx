import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import { AppShell, Loading } from "../components";
import { ParentSize } from "@visx/responsive";
import LiquidityChart from "components/LiquidityChart";
import VolumeChart from "components/VolumeChart";

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
  const [loading, setLoading] = useState(false);
  const [totalHeight, setTotalHeight] = React.useState(550 + 30);
  const [sidebarOptions, setSidebarOptions] = useState({
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

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const ethereum_res = await ethereum_client.query({
        query: customDayDatasQuery,
      });
      const bsc_res = await bsc_client.query({ query: customDayDatasQuery });
      const moonriver_res = await moonriver_client.query({
        query: customDayDatasQuery,
      });
      const xdai_res = await xdai_client.query({ query: customDayDatasQuery });
      const polygon_res = await polygon_client.query({
        query: customDayDatasQuery,
      });
      const harmony_res = await harmony_client.query({
        query: customDayDatasQuery,
      });
      const celo_res = await celo_client.query({ query: customDayDatasQuery });
      const fantom_res = await fantom_client.query({
        query: customDayDatasQuery,
      });
      const arbitrum_res = await arbitrum_client.query({
        query: customDayDatasQuery,
      });

      const getDateArr = (data) => data.map((item) => item.date);

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

      const ethereumDate = getDateArr(ethereum_res.data.dayDatas);
      const bscDate = getDateArr(bsc_res.data.dayDatas);
      const moonriverDate = getDateArr(moonriver_res.data.dayDatas);
      const xdaiDate = getDateArr(xdai_res.data.dayDatas);
      const polygonDate = getDateArr(polygon_res.data.dayDatas);
      const harmonyDate = getDateArr(harmony_res.data.dayDatas);
      const celoDate = getDateArr(celo_res.data.dayDatas);
      const fantomDate = getDateArr(fantom_res.data.dayDatas);
      const arbitrumDate = getDateArr(arbitrum_res.data.dayDatas);

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
        ])
      );

      const ethereumNew = getNewData(ethereum_res.data.dayDatas);
      const bscNew = getNewData(bsc_res.data.dayDatas);
      const moonriverNew = getNewData(moonriver_res.data.dayDatas);
      const xdaiNew = getNewData(xdai_res.data.dayDatas);
      const polygonNew = getNewData(polygon_res.data.dayDatas);
      const harmonyNew = getNewData(harmony_res.data.dayDatas);
      const celoNew = getNewData(celo_res.data.dayDatas);
      const fantomNew = getNewData(fantom_res.data.dayDatas);
      const arbitrumNew = getNewData(arbitrum_res.data.dayDatas);

      setAllData({
        ...allData,
        ethereum: ethereumNew,
        bsc: bscNew,
        moonriver: moonriverNew,
        xdai: xdaiNew,
        polygon: polygonNew,
        harmony: harmonyNew,
        celo: celoNew,
        fantom: fantomNew,
        arbitrum: arbitrumNew,
      });
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <AppShell
      sidebarOptions={sidebarOptions}
      setSidebarOptions={setSidebarOptions}
    >
      <Head>
        <title>Dashboard | Crypto Analytics</title>
      </Head>

      {loading ? (
        <Loading />
      ) : (
        allData?.ethereum !== null && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <Paper variant="outlined" style={{ height: totalHeight }}>
                <ParentSize>
                  {({ width, height }) => (
                    <LiquidityChart
                      width={width}
                      height={height}
                      sidebarOptions={sidebarOptions}
                      allData={allData}
                      totalHeight={totalHeight}
                      setTotalHeight={setTotalHeight}
                    />
                  )}
                </ParentSize>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Paper variant="outlined" style={{ height: totalHeight }}>
                <ParentSize>
                  {({ width, height }) => (
                    <VolumeChart
                      width={width}
                      height={height}
                      sidebarOptions={sidebarOptions}
                      allData={allData}
                      totalHeight={totalHeight}
                      setTotalHeight={setTotalHeight}
                    />
                  )}
                </ParentSize>
              </Paper>
            </Grid>
          </Grid>
        )
      )}
    </AppShell>
  );
}

export default IndexPage;
