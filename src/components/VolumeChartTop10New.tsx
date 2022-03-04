import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { BarChart, Bar, Tooltip, Legend } from "recharts";
import { oneMonth, oneWeek } from "../core";
import { numberWithCommas } from "core/utils";
import { timeFormat } from "d3-time-format";

const useStyles = makeStyles((theme) => ({
  filter: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const getColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16);

const CustomTooltip = ({ active, payload, label, setHoveredData }) => {
  useEffect(() => {
    if (active && payload && payload.length) {
      // console.log("payload || VolumeChartTop10", payload);
      const hoverItem = payload.map((item) => ({
        ...item,
        date: getDate(item.payload.date),
      }));
      // console.log("hoverItem", hoverItem);
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
  const mainData = allData;
  // console.log("allData || VolumeChartTop10", allData);
  const classes = useStyles();
  const [topHeight, setTopHeight] = useState(350);
  const [hoveredData, setHoveredData] = useState([]);
  const [selectTime, setSelectTime] = useState("");
  const [updatedData, setUpdatedData] = useState(
    mainData[sidebarOptions][0]?.data
  );
  const [selectedData, setSelectedData] = useState([]);
  const [selectedData2, setSelectedData2] = useState([]);
  const [total, setTotal] = useState(0);
  const [times, setTimes] = useState([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectTime(event.target.value as string);
  };

  useEffect(() => {
    // console.log("mainData[sidebarOptions] || VolumeChartTop10", mainData[sidebarOptions]);

    const _times = mainData[sidebarOptions]?.map(({ time }) => {
      // console.log("time || LiquidityChartTop10", time);
      // const _time = time[1].split("T")[0];
      const monthName = new Date(time[1]).toLocaleString("default", {
        month: "long",
      });
      // return _time.split("-")[0] + ", " + monthName;
      return time[1].toString().split(" ")[3] + ", " + monthName;
      // return monthName;
    });
    const idx =
      _times.indexOf(selectTime) !== -1 ? _times.indexOf(selectTime) : 0;
    setTimes(_times);
    setUpdatedData(mainData[sidebarOptions][idx]?.data);
    setSelectTime(_times[idx]);
  }, [mainData, sidebarOptions, selectTime]);

  // useEffect(() => {
  //   const filteredData = hoveredData.filter(
  //     (item) => sidebarOptions[item.name]
  //   );
  //   setHoveredData(filteredData);
  // }, [sidebarOptions]);

  if (mainData[sidebarOptions][0]?.data === null) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  const [top10Items, setTop10Items] = useState([
    // { name: "ILV-WETH", color: getColor() },
    // { name: "USDC-WETH", color: getColor() },
    // { name: "OHM-DAI", color: getColor() },
    // { name: "TOKE-WETH", color: getColor() },
    // { name: "WBTC-WETH", color: getColor() },
    // { name: "BIT-WETH", color: getColor() },
    // { name: "WETH-USDT", color: getColor() },
    // { name: "WETH-ALCX", color: getColor() },
    // { name: "DAI-WETH", color: getColor() },
    // { name: "OHM-WETH", color: getColor() },
  ]);

  useEffect(() => {
    // console.log("updatedData || VolumeChartTop10", updatedData);
    const separate = updatedData?.map((item) =>
      item?.dayData.map((_item) => ({
        name: item.name,
        value: Number(Number(_item.volumeUSD).toFixed(2)),
        date: _item.date,
      }))
    );

    // console.log("separate", separate);

    setTop10Items([
      { name: separate[0] ? separate[0][0]?.name : '', color: getColor() },
      { name: separate[1] ? separate[1][0]?.name : '', color: getColor() },
      { name: separate[2] ? separate[2][0]?.name : '', color: getColor() },
      { name: separate[3] ? separate[3][0]?.name : '', color: getColor() },
      { name: separate[4] ? separate[4][0]?.name : '', color: getColor() },
      { name: separate[5] ? separate[5][0]?.name : '', color: getColor() },
      { name: separate[6] ? separate[6][0]?.name : '', color: getColor() },
      { name: separate[7] ? separate[7][0]?.name : '', color: getColor() },
      { name: separate[8] ? separate[8][0]?.name : '', color: getColor() },
      { name: separate[9] ? separate[9][0]?.name : '', color: getColor() },
    ]);

    const result = separate[0]?.map((_, i) => ({
      [separate[0] && separate[0][i]?.name]: separate[0] && separate[0][i]?.value || 0,
      [separate[1] && separate[1][i]?.name]: separate[1] && separate[1][i]?.value || 0,
      [separate[2] && separate[2][i]?.name]: separate[2] && separate[2][i]?.value || 0,
      [separate[3] && separate[3][i]?.name]: separate[3] && separate[3][i]?.value || 0,
      [separate[4] && separate[4][i]?.name]: separate[4] && separate[4][i]?.value || 0,
      [separate[5] && separate[5][i]?.name]: separate[5] && separate[5][i]?.value || 0,
      [separate[6] && separate[6][i]?.name]: separate[6] && separate[6][i]?.value || 0,
      [separate[7] && separate[7][i]?.name]: separate[7] && separate[7][i]?.value || 0,
      [separate[8] && separate[8][i]?.name]: separate[8] && separate[8][i]?.value || 0,
      [separate[9] && separate[9][i]?.name]: separate[9] && separate[9][i]?.value || 0,
      date: separate[0] && separate[0][i]?.date || null,
    }));

    const _new = [...Array(10).keys()].map((_, i) => {
    // const _new = [...Array(separate[0] ? separate[0].length : 0).keys()].map((_, i) => {
      return {
        name: separate[i] ? separate[i][0]?.name : '',
        value: separate[i] ? separate[i][0]?.value : '',
        date: separate[i] ? getDate(separate[i][0]?.date) : '',
      };
    });

    setHoveredData(_new);
    setSelectedData(result ? result.reverse() : []);
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

  useEffect(() => {}, []);

  // const filterItems = (selectedItem) => {
  //   return allData?.[selectedItem][0]?.data[0]?.dayData?.filter((d) => timespan <= d.date);
  // };

  // const lastData = finalData[finalData.length - 1];
  // const firstTimeHoveredData = [];
  // const sidebarOptionsKeys = Object.keys(sidebarOptions);

  // sidebarOptionsKeys.forEach((key) => {
  //   if (sidebarOptions[key]) {
  //     firstTimeHoveredData.push({
  //       name: key,
  //       date: lastData[`${key}_date`],
  //       value: lastData[key],
  //     });
  //   }
  // });

  // useEffect(() => {
  //   const newData = {};

  //   networkItems.forEach((item) => {
  //     newData[item.name] = filterItems(item.name);
  //   });

  //   setUpdatedData(newData);
  // }, [timespan]);

  useEffect(() => {
    let _hoveredData = hoveredData;
    // if (_hoveredData.length === 0) {
    //   _hoveredData = firstTimeHoveredData;
    // }
    const totalOfValues = _hoveredData?.reduce(
      (acc, curr) => acc + Number(curr.value || 0),
      0
    );
    // setHoveredData(_hoveredData);
    setTotal(totalOfValues);
  }, [hoveredData]);

  // const selectedData = networkItems.filter(
  //   (item) => sidebarOptions[item.name] === true
  // );

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
            {"$" + numberWithCommas(Number(total.toFixed(2) || 0))}
          </Typography>
          {hoveredData?.map((item, index) => (
            <>
              {item.name?.length > 0 && (
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  key={index}
                >
                  {item.name}: {"$" + numberWithCommas(item.value || 0)}
                </Typography>
              )}
            </>
          ))}
        </aside>

        <aside>
          <div className={classes.filter}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Month
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={selectTime}
                onChange={handleChange}
                label="Month"
              >
                {times?.map((time, i) => (
                  <MenuItem key={i} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
