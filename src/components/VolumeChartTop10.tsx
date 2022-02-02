import React, { useState, useEffect } from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";
import { BarChart, Bar, Tooltip, Legend } from "recharts";
import { oneMonth, oneWeek, numberWithCommas } from "../core";
import { timeFormat } from "d3-time-format";
import { networkItems } from "../data";

const useStyles = makeStyles((theme) => ({
  filter: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
}));

const getColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16);

const CustomTooltip = ({ active, payload, label, setHoveredData }) => {
  useEffect(() => {
    if (active && payload && payload.length) {
      console.log("payload || LiquidityChartTop10", payload);
      const hoverItem = payload.map((item) => ({
        ...item,
        date: getDate(item.payload.date),
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
const VolumeChartTop10 = ({
  sidebarOptions,
  allData,
  width,
  height,
  totalHeight,
  setTotalHeight,
}) => {
  // console.log("allData || VolumeChartTop10", allData);
  const classes = useStyles();
  const [topHeight, setTopHeight] = useState(350);
  const [hoveredData, setHoveredData] = useState([]);
  const [updatedData, setUpdatedData] = useState(allData[sidebarOptions]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedData2, setSelectedData2] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setUpdatedData(allData[sidebarOptions]);
  }, [allData, sidebarOptions]);

  if (allData[sidebarOptions] === null) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  const [top10Items, setTop10Items] = useState([
    { name: "ILV-WETH", color: getColor() },
    { name: "USDC-WETH", color: getColor() },
    { name: "OHM-DAI", color: getColor() },
    { name: "TOKE-WETH", color: getColor() },
    { name: "WBTC-WETH", color: getColor() },
    { name: "BIT-WETH", color: getColor() },
    { name: "WETH-USDT", color: getColor() },
    { name: "WETH-ALCX", color: getColor() },
    { name: "DAI-WETH", color: getColor() },
    { name: "OHM-WETH", color: getColor() },
  ]);

  useEffect(() => {
    const separate = updatedData?.map((item) =>
      item?.dayData.map((_item) => ({
        name: item.name,
        value: Number(Number(_item.volumeUSD).toFixed(2)),
        date: _item.date,
      }))
    );

    setTop10Items([
      { name: separate[0][0]?.name, color: getColor() },
      { name: separate[1][0]?.name, color: getColor() },
      { name: separate[2][0]?.name, color: getColor() },
      { name: separate[3][0]?.name, color: getColor() },
      { name: separate[4][0]?.name, color: getColor() },
      { name: separate[5][0]?.name, color: getColor() },
      { name: separate[6][0]?.name, color: getColor() },
      { name: separate[7][0]?.name, color: getColor() },
      { name: separate[8][0]?.name, color: getColor() },
      { name: separate[9][0]?.name, color: getColor() },
    ]);

    const result = separate[0]?.map((_, i) => ({
      [separate[0][i]?.name]: separate[0][i]?.value || 0,
      [separate[1][i]?.name]: separate[1][i]?.value || 0,
      [separate[2][i]?.name]: separate[2][i]?.value || 0,
      [separate[3][i]?.name]: separate[3][i]?.value || 0,
      [separate[4][i]?.name]: separate[4][i]?.value || 0,
      [separate[5][i]?.name]: separate[5][i]?.value || 0,
      [separate[6][i]?.name]: separate[6][i]?.value || 0,
      [separate[7][i]?.name]: separate[7][i]?.value || 0,
      [separate[8][i]?.name]: separate[8][i]?.value || 0,
      [separate[9][i]?.name]: separate[9][i]?.value || 0,

      date: separate[0][i]?.date || null,
    }));

    const _new = [...Array(10).keys()].map((_, i) => {
      return {
        name: separate[i][0]?.name,
        value: separate[i][0]?.value,
        date: getDate(separate[i][0]?.date),
      };
    });

    setHoveredData(_new);
    setSelectedData(result.reverse());
  }, [updatedData]);

  const [timespan, setTimespan] = useState(oneMonth());

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

  useEffect(() => {
    let _hoveredData = hoveredData;
    const totalOfValues = _hoveredData?.reduce(
      (acc, curr) => acc + Number(curr.value),
      0
    );
    setTotal(totalOfValues);
  }, [hoveredData]);

  useEffect(() => {
    const newData = selectedData?.filter((d) => timespan <= d.date);
    // console.log("timespan update", { updatedData, selectedData, newData });
    setSelectedData2(newData.length > 0 ? newData : selectedData);
  }, [timespan, selectedData]);

  return (
    <div>
      <div
        style={{
          height: topHeight + "px",
          padding: "24px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <aside>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            style={{ textTransform: "capitalize" }}
          >
            {sidebarOptions} Volume
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {hoveredData[0] ? hoveredData[0]?.date : ""}
          </Typography>
          <Typography
            variant="h5"
            color="textPrimary"
            style={{ margin: "10px 0" }}
          >
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
              style={{ color: "gray" }}
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
              style={{ color: "gray" }}
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
              style={{ color: "gray" }}
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
        data={selectedData2}
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
        <Legend verticalAlign="bottom" align="left" height={90} />

        {top10Items?.map((item) => (
          <Bar dataKey={item.name} stackId="a" fill={item.color} />
        ))}
      </BarChart>
    </div>
  );
};

export default VolumeChartTop10;
