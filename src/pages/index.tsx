import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import { AppShell, AreaChart, BarChart, Loading } from "../components";

import { ParentSize } from "@visx/responsive";
import NewGraph0 from "components/_newGraph0";
import NewGraph from "components/_newGraph";
import NewGraph3 from "components/_newGraph3";
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
              <Paper variant="outlined" style={{ height: 350 }}>
                <ParentSize>
                  {({ width, height }) => (
                    <NewGraph0
                      width={width}
                      height={height}
                      sidebarOptions={sidebarOptions}
                      allData={allData}
                    />
                  )}
                </ParentSize>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Paper variant="outlined" style={{ height: 350 }}>
                <ParentSize>
                  {({ width, height }) => (
                    <NewGraph3 width={width} height={height} />
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
