import React from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";
import {
  BarChart,
  Bar,
  // XAxis,
  // YAxis,
  // CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { oneMonth, oneWeek, numberWithCommas } from "../core";
import { timeFormat } from "d3-time-format";

const useStyles = makeStyles((theme) => ({
  filter: {
    display: "flex",
    // flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
}));

const CustomTooltip = ({ active, payload, label, setHoveredData }) => {
  const [state, setState] = React.useState([]);

  React.useEffect(() => {
    if (active && payload && payload.length) {
      const hoverItem = payload.map((item) => ({
        name: item.name,
        date: item.payload[`${item.name}_date`],
        value: item.value,
      }));
      // console.log("hover data", hoverItem);
      setState(hoverItem);
      setHoveredData(hoverItem);
    }
  }, [label]);

  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'gray', padding: '15px', borderRadius: '20px' }}>
        {/* <p>{getDate(state[0]?.date)}</p> */}
        {state &&
          state.map((item, index) => (
            <p key={index} style={{margin: '5px 0'}}>
              {item.name}: {numberWithCommas(item.value)}
            </p>
          ))}
      </div>
    );
  }

  return null;
};

const formatDate = timeFormat("%b %d, '%y");
const getDate = (timestamps) => formatDate(new Date(timestamps * 1000));

const VolumeChart = ({ sidebarOptions, allData, width, height }) => {
  const classes = useStyles();
  const [hoveredData, setHoveredData] = React.useState([]);
  const [updatedData, setUpdatedData] = React.useState(allData);
  React.useEffect(() => setUpdatedData(allData), [allData]);

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

  // console.log("hoveredData", hoveredData);

  const modifyItem = (selectedItem) => {
    return updatedData[selectedItem]?.map((item) => ({
      // [selectedItem]: Number(item.volumeETH).toFixed(2),
      [selectedItem]: Number(item.volumeUSD).toFixed(2),
      // [selectedItem]: Math.round(Number(item.volumeUSD)),
      [`${selectedItem}_date`]: item.date,
    }));
  };

  const ethereum = modifyItem("ethereum");
  const bsc = modifyItem("bsc");
  const moonriver = modifyItem("moonriver");
  const xdai = modifyItem("xdai");
  const polygon = modifyItem("polygon");
  const harmony = modifyItem("harmony");
  const celo = modifyItem("celo");
  const fantom = modifyItem("fantom");
  const arbitrum = modifyItem("arbitrum");

  const length = [
    ethereum.length,
    bsc.length,
    moonriver.length,
    xdai.length,
    polygon.length,
    harmony.length,
    celo.length,
    fantom.length,
    arbitrum.length,
  ];
  // const minLength = Math.min(...length);
  const maxLength = Math.max(...length);

  const finalData = Array.from({ length: maxLength }, (v, k) => ({
    ethereum: Number(ethereum[k]?.ethereum) || 0,
    bsc: Number(bsc[k]?.bsc) || 0,
    moonriver: Number(moonriver[k]?.moonriver) || 0,
    xdai: Number(xdai[k]?.xdai) || 0,
    polygon: Number(polygon[k]?.polygon) || 0,
    harmony: Number(harmony[k]?.harmony) || 0,
    celo: Number(celo[k]?.celo) || 0,
    fantom: Number(fantom[k]?.fantom) || 0,
    arbitrum: Number(arbitrum[k]?.arbitrum) || 0,

    ethereum_date: ethereum[k]?.ethereum_date || "",
    bsc_date: bsc[k]?.bsc_date || "",
    moonriver_date: moonriver[k]?.moonriver_date || "",
    xdai_date: xdai[k]?.xdai_date || "",
    polygon_date: polygon[k]?.polygon_date || "",
    harmony_date: harmony[k]?.harmony_date || "",
    celo_date: celo[k]?.celo_date || "",
    fantom_date: fantom[k]?.fantom_date || "",
    arbitrum_date: arbitrum[k]?.arbitrum_date || "",
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

  return (
    <div>
      <div
        style={{
          height: "100px",
          padding: "24px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <aside>
          <Typography variant="subtitle2" color="textSecondary">
            Volume
          </Typography>
          {/* <Typography variant="h5" color="textPrimary">
            $4,319,493,164.81
          </Typography> */}
          <Typography variant="subtitle1" color="textSecondary">
            {hoveredData[0] ? getDate(hoveredData[0]?.date) : ''}
          </Typography>
        </aside>

        <aside>
          <div className={classes.filter}>
            <Button
              type="button"
              value="1W"
              aria-label="1 week timespan"
              variant="text"
              size="small"
              color="primary"
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
              color="primary"
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
              color="primary"
              onClick={onTimespanChange}
            >
              ALL
            </Button>
          </div>
        </aside>
      </div>
      <BarChart
        width={width || 500}
        height={height - 100 || 300}
        // data={data}
        data={finalData}
        margin={{
          top: 10,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis /> */}
        {/* <Tooltip /> */}
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
        <Legend verticalAlign="top" height={36} />
        {/* <Bar dataKey="pv" stackId="a" fill="#8884d8" />
      <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
      <Bar dataKey="amt" stackId="a" fill="tomato" /> */}
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

export default VolumeChart;
