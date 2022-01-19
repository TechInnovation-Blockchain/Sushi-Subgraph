import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import { AppShell, Loading, Network } from "../components";
import { ParentSize } from "@visx/responsive";
import LiquidityChart from "components/LiquidityChart";
import VolumeChart from "components/VolumeChart";

// data
import { fetchData, networkItems } from "data";

const HomePage = () => {
  const sidebarOptionsCal = {};
  networkItems.forEach(({ name, defaultSelected }) => {
    sidebarOptionsCal[name] = defaultSelected;
  });
  const allDataCal = {};
  networkItems.forEach(({ name }) => {
    allDataCal[name] = null;
  });

  const [loading, setLoading] = useState(false);
  // TODO: add space for new network client
  const [totalHeight, setTotalHeight] = useState(550 + 30);
  const [sidebarOptions, setSidebarOptions] = useState(sidebarOptionsCal);
  const [allData, setAllData] = useState<any>(allDataCal);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      const data = await fetchData();
      setAllData(data);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <AppShell
      sidebarOptions={sidebarOptions}
      setSidebarOptions={setSidebarOptions}
    >
      <Head>
        <title>Dashboard | Sushi Multichain Analytics</title>
      </Head>

      {loading ? (
        <Loading />
      ) : (
        allData?.ethereum !== null && (
          <>
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
            {/* <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Network title="APY (24h)" value={123} format="percent" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Network title="APY (24h)" value={123} format="percent" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Network title="APY (24h)" value={123} format="percent" />
              </Grid>
            </Grid> */}
          </>
        )
      )}
    </AppShell>
  );
}

export default HomePage;
