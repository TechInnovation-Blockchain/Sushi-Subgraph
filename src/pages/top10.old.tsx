import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import { AppShell, Loading } from "../components";
import { ParentSize } from "@visx/responsive";
import LiquidityChartTop10 from "components/LiquidityChartTop10";
// import VolumeChart from "components/VolumeChart";

// data
import { fetchData2, networkItems } from "data";

const Top10Page = () => {
  const sidebarOptionsCal = {};
  const allDataCal = {};
  networkItems.forEach(({ name, defaultSelected }) => {
    sidebarOptionsCal[name] = defaultSelected;
  });
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
      const data = await fetchData2();
      console.log("===== data || top10.tsx =====", data);

      setAllData(data);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <AppShell
      sidebarOptions={sidebarOptions}
      setSidebarOptions={setSidebarOptions}
      sidebar="2"
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
                  {/* <ParentSize>
                    {({ width, height }) => (
                      <LiquidityChartTop10
                        width={width}
                        height={height}
                        sidebarOptions={sidebarOptions}
                        allData={allData}
                        totalHeight={totalHeight}
                        setTotalHeight={setTotalHeight}
                      />
                    )}
                  </ParentSize> */}
                </Paper>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={6}>
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
              </Grid> */}
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
};

export default Top10Page;
