import React from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";
import { BarChart, Bar, Tooltip, Legend } from "recharts";
import { oneMonth, oneWeek, numberWithCommas } from "../core";
import { timeFormat } from "d3-time-format";

const useStyles = makeStyles((theme) => ({
  filter: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
}));

const CustomTooltip = ({ active, payload, label, setHoveredData }) => {
  React.useEffect(() => {
    if (active && payload && payload.length) {
      console.log("payload", payload);
      const hoverItem = payload.map((item) => ({
        name: item.name,
        date: item.payload[`${item.name}_date`],
        value: item.value,
      }));
      console.log("hoverItem", hoverItem);
      setHoveredData(hoverItem);
    }
  }, [label]);

  return null;
};

const formatDate = timeFormat("%b %d, '%y");
const getDate = (timestamps) => formatDate(new Date(timestamps * 1000));

// main function of the component
const LiquidityChart = ({
  sidebarOptions,
  allData,
  width,
  height,
  totalHeight,
  setTotalHeight,
}) => {
  const classes = useStyles();
  const [topHeight, setTopHeight] = React.useState(100);
  const [hoveredData, setHoveredData] = React.useState([]);
  const [updatedData, setUpdatedData] = React.useState(allData);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => setUpdatedData(allData), [allData]);
  React.useEffect(() => {
    let increaseHeight = 30;
    const len = Object.keys(sidebarOptions)
      .map((key) => sidebarOptions[key])
      .filter((item) => item == true).length;

    if (len > 5) {
      increaseHeight = 25;
    }

    if (len > 0) {
      setTotalHeight(350 + increaseHeight * len);
      setTopHeight(100 + increaseHeight * len);
    } else {
      setTotalHeight(350);
      setTopHeight(100);
    }

    const filteredData = hoveredData.filter((item) => sidebarOptions[item.name]);
    setHoveredData(filteredData);
  }, [sidebarOptions]);

  if (
    allData.ethereum === null ||
    allData.bsc === null ||
    allData.moonriver === null ||
    allData.xdai === null ||
    allData.polygon === null ||
    allData.harmony === null ||
    allData.celo === null ||
    allData.fantom === null ||
    allData.arbitrum === null
  ) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  const finalData = updatedData.ethereum.map((item, i) => ({
    ethereum: Number(item.liquidityUSD).toFixed(2),
    bsc: Number(updatedData.bsc[i]?.liquidityUSD).toFixed(2),
    moonriver: Number(updatedData.moonriver[i]?.liquidityUSD).toFixed(2),
    xdai: Number(updatedData.xdai[i]?.liquidityUSD).toFixed(2),
    polygon: Number(updatedData.polygon[i]?.liquidityUSD).toFixed(2),
    harmony: Number(updatedData.harmony[i]?.liquidityUSD).toFixed(2),
    celo: Number(updatedData.celo[i]?.liquidityUSD).toFixed(2),
    fantom: Number(updatedData.fantom[i]?.liquidityUSD).toFixed(2),
    arbitrum: Number(updatedData.arbitrum[i]?.liquidityUSD).toFixed(2),

    ethereum_date: getDate(item.date),
    bsc_date: getDate(updatedData.bsc[i]?.date),
    moonriver_date: getDate(updatedData.moonriver[i]?.date),
    xdai_date: getDate(updatedData.xdai[i]?.date),
    polygon_date: getDate(updatedData.polygon[i]?.date),
    harmony_date: getDate(updatedData.harmony[i]?.date),
    celo_date: getDate(updatedData.celo[i]?.date),
    fantom_date: getDate(updatedData.fantom[i]?.date),
    arbitrum_date: getDate(updatedData.arbitrum[i]?.date),
  }));

  const [timespan, setTimespan] = React.useState(oneMonth());

  function onTimespanChange(e) {
    const value = e.currentTarget.value;
    if (value === "ALL") {
      setTimespan(62802180);
    } else if (value === "1W") {
      setTimespan(oneWeek());
    } else if (value === "1M") {
      setTimespan(oneMonth());
    }
  }

  const filterItems = (selectedItem) => {
    return allData?.[selectedItem]?.filter((d) => timespan <= d.date);
  };

  React.useEffect(() => {
    setUpdatedData({
      ...updatedData,
      ethereum: filterItems("ethereum"),
      bsc: filterItems("bsc"),
      moonriver: filterItems("moonriver"),
      xdai: filterItems("xdai"),
      polygon: filterItems("polygon"),
      harmony: filterItems("harmony"),
      celo: filterItems("celo"),
      fantom: filterItems("fantom"),
      arbitrum: filterItems("arbitrum"),
    });
  }, [timespan]);

  React.useEffect(() => {
    const totalOfValues = hoveredData?.reduce(
      (acc, curr) => acc + Number(curr.value),
      0
    );
    setTotal(totalOfValues);
  }, [hoveredData]);

  return (
    <div>
      <div
        style={{
          height: topHeight + "px",
          // height: "300px",
          padding: "24px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <aside>
          <Typography variant="subtitle2" color="textSecondary">
            Liquidity
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {hoveredData[0] ? hoveredData[0]?.date : ""}
          </Typography>
          <Typography variant="h5" color="textPrimary" style={{margin: '10px 0'}}>
            {"$" + numberWithCommas(Number(total.toFixed(2)))}
          </Typography>
          {hoveredData?.map((item, index) => (
            <Typography variant="subtitle2" color="textSecondary" key={index}>
              {item.name}: {"$" + numberWithCommas(item.value)}
            </Typography>
          ))}
        </aside>

        <aside>
          <div className={classes.filter}>
            <Button
              type="button"
              value="1W"
              aria-label="1 week timespan"
              variant="text"
              size="small"
              // color="gray"
              style={{color: "gray"}}
              onClick={onTimespanChange}
            >
              1W
            </Button>
            <Button
              type="button"
              value="1M"
              aria-label="1 month timespan"
              variant="text"
              size="small"
              // color="gray"
              style={{color: "gray"}}
              onClick={onTimespanChange}
            >
              1M
            </Button>
            <Button
              type="button"
              value="ALL"
              aria-label="ALL timespan"
              variant="text"
              size="small"
              // color="gray"
              style={{color: "gray"}}
              onClick={onTimespanChange}
            >
              ALL
            </Button>
          </div>
        </aside>
      </div>
      <BarChart
        width={width}
        height={totalHeight - topHeight}
        // height={height - 100}
        data={finalData}
        margin={{
          top: 10,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <Tooltip
          content={
            <CustomTooltip
              setHoveredData={setHoveredData}
              active={undefined}
              payload={undefined}
              label={undefined}
            />
          }
        />
        <Legend verticalAlign="bottom" align="left" height={36 + 30} />
        {sidebarOptions.ethereum && (
          <Bar dataKey="ethereum" stackId="a" fill="#8884d8" />
        )}
        {sidebarOptions.bsc && <Bar dataKey="bsc" stackId="a" fill="#82ca9d" />}
        {sidebarOptions.moonriver && (
          <Bar dataKey="moonriver" stackId="a" fill="red" />
        )}
        {sidebarOptions.xdai && <Bar dataKey="xdai" stackId="a" fill="green" />}
        {sidebarOptions.polygon && (
          <Bar dataKey="polygon" stackId="a" fill="blue" />
        )}
        {sidebarOptions.harmony && (
          <Bar dataKey="harmony" stackId="a" fill="gray" />
        )}
        {sidebarOptions.celo && (
          <Bar dataKey="celo" stackId="a" fill="tomato" />
        )}
        {sidebarOptions.fantom && (
          <Bar dataKey="fantom" stackId="a" fill="cyan" />
        )}
        {sidebarOptions.arbitrum && (
          <Bar dataKey="arbitrum" stackId="a" fill="#bdbdbd" />
        )}
      </BarChart>
    </div>
  );
};

export default LiquidityChart;
