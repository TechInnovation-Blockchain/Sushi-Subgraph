import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import { AppShell, Loading } from "../components";
import { ParentSize } from "@visx/responsive";
import LiquidityChartTop10 from "components/LiquidityChartTop10New";
import VolumeChartTop10 from "components/VolumeChartTop10New";

// data
import { fetchData2, networkItems } from "data";
// import localData from 'data/test';

const Top10Page = () => {
  const allDataCal = {};

  networkItems.forEach(({ name }) => {
    allDataCal[name] = null;
  });
  const [loading, setLoading] = useState(false);
  // TODO: add space for new network client
  const [totalHeight, setTotalHeight] = useState(660 + 30);
  const [sidebarOptions, setSidebarOptions] = useState("ethereum");
  const [allData, setAllData] = useState<any>(allDataCal);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      const data:any = await fetchData2();
      // const data:any = localData;
      console.log("===== data || top10.tsx =====", data);

      setAllData(data);
      setLoading(false);
    };
    fetch();
  }, []);

  // console.log("sidebarOptions || Top10Page", sidebarOptions);

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
                  <ParentSize>
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
                  </ParentSize>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Paper variant="outlined" style={{ height: totalHeight }}>
                  <ParentSize>
                    {({ width, height }) => (
                      <VolumeChartTop10
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
          </>
        )
      )}
    </AppShell>
  );
};

export default Top10Page;
