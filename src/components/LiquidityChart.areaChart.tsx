import React from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";
import { AreaChart, Area, Legend, Tooltip } from "recharts";
import { oneMonth, oneWeek } from "../core/timestamps";
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
      <div
        style={{ background: "gray", padding: "15px", borderRadius: "20px" }}
      >
        {/* <p>{getDate(state[0]?.date)}</p> */}
        {state &&
          state.map((item, index) => (
            <p key={index} style={{ margin: "5px 0" }}>
              {item.name}: {item.value}
            </p>
          ))}
      </div>
    );
  }

  return null;
};

const formatDate = timeFormat("%b %d, '%y");
const getDate = (timestamps) => formatDate(new Date(timestamps * 1000));

export default function LiquidityChart({
  sidebarOptions,
  allData,
  width,
  height,
}) {
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
    allData.arbitrum === null ||
    allData.avalanche === null
  ) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  // const modifyItem = (selectedItem, divider) => {
  //   return updatedData[selectedItem]?.map((item) => ({
  //     [selectedItem]: Number(item.liquidityETH / divider).toFixed(2),
  //   }));
  // };
  const modifyItem = (selectedItem) => {
    return updatedData[selectedItem]?.map((item) => ({
      // [selectedItem]: Number(item.liquidityETH).toFixed(2),
      [selectedItem]: Number(item.liquidityUSD).toFixed(2),
      [`${selectedItem}_date`]: item.date,
    }));
  };

  // const ethereum = modifyItem("ethereum", 100);
  // const bsc = modifyItem("bsc", 1);
  // const moonriver = modifyItem("moonriver", 1);
  // const xdai = modifyItem("xdai", 1000);
  // const polygon = modifyItem("polygon", 10);
  // const harmony = modifyItem("harmony", 100000);
  // const celo = modifyItem("celo", 1000);
  // const fantom = modifyItem("fantom", 1000);
  // const arbitrum = modifyItem("arbitrum", 10);
  const ethereum = modifyItem("ethereum");
  const bsc = modifyItem("bsc");
  const moonriver = modifyItem("moonriver");
  const xdai = modifyItem("xdai");
  const polygon = modifyItem("polygon");
  const harmony = modifyItem("harmony");
  const celo = modifyItem("celo");
  const fantom = modifyItem("fantom");
  const arbitrum = modifyItem("arbitrum");
  const avalanche = modifyItem("avalanche");

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
    avalanche.length,
  ];
  const minLength = Math.min(...length);
  // const maxLength = Math.max(...length);

  const finalData = Array.from({ length: minLength }, (v, k) => ({
    ethereum: Number(ethereum[k]?.ethereum) || 0,
    bsc: Number(bsc[k]?.bsc) || 0,
    moonriver: Number(moonriver[k]?.moonriver) || 0,
    xdai: Number(xdai[k]?.xdai) || 0,
    polygon: Number(polygon[k]?.polygon) || 0,
    harmony: Number(harmony[k]?.harmony) || 0,
    celo: Number(celo[k]?.celo) || 0,
    fantom: Number(fantom[k]?.fantom) || 0,
    arbitrum: Number(arbitrum[k]?.arbitrum) || 0,
    avalanche: Number(avalanche[k]?.avalanche) || 0,

    ethereum_date: ethereum[k]?.ethereum_date || "",
    bsc_date: bsc[k]?.bsc_date || "",
    moonriver_date: moonriver[k]?.moonriver_date || "",
    xdai_date: xdai[k]?.xdai_date || "",
    polygon_date: polygon[k]?.polygon_date || "",
    harmony_date: harmony[k]?.harmony_date || "",
    celo_date: celo[k]?.celo_date || "",
    fantom_date: fantom[k]?.fantom_date || "",
    arbitrum_date: arbitrum[k]?.arbitrum_date || "",
    avalanche_date: avalanche[k]?.avalanche || "",
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
      avalanche: filterItems("avalanche"),
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
            Liquidity
          </Typography>
          {/* <Typography variant="h5" color="textPrimary">
            $4,319,493,164.81
          </Typography> */}
          <Typography variant="subtitle1" color="textSecondary">
            {hoveredData[0] ? getDate(hoveredData[0]?.date) : ""}
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
      <AreaChart
        width={width || 600}
        // height={height || 400}
        height={height - 100 || 400}
        // data={data}
        data={finalData}
        // data={updatedData}
        margin={{
          top: 10,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorEthereum" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#5f7ae3" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#5f7ae3" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorBsc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#e8b611" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#e8b611" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorMoonriver" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#da1377" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#da1377" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorXdai" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10a590" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#10a590" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPolygon" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7e46de" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#7e46de" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorHarmony" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4ddfd7" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#4ddfd7" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorCelo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f3c559" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#f3c559" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorFantom" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1766f7" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#1766f7" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorArbitrum" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#279ce8" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#279ce8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorAvalanche" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#e24040" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#e24040" stopOpacity={0} />
          </linearGradient>
        </defs>
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
        {sidebarOptions.ethereum && (
          <Area
            type="monotone"
            dataKey="ethereum"
            stroke="#5f7ae3"
            fill="url(#colorEthereum)"
            fillOpacity={1}
          />
        )}
        {sidebarOptions.bsc && (
          <Area
            type="monotone"
            dataKey="bsc"
            stroke="#e8b611"
            fill="url(#colorBsc)"
            fillOpacity={1}
          />
        )}
        {sidebarOptions.moonriver && (
          <Area
            type="monotone"
            dataKey="moonriver"
            stroke="#da1377"
            fill="url(#colorMoonriver)"
            fillOpacity={1}
          />
        )}
        {sidebarOptions.xdai && (
          <Area
            type="monotone"
            dataKey="xdai"
            stroke="#10a590"
            fill="url(#colorXdai)"
            fillOpacity={1}
          />
        )}
        {sidebarOptions.polygon && (
          <Area
            type="monotone"
            dataKey="polygon"
            stroke="#7e46de"
            fill="url(#colorPolygon)"
            fillOpacity={1}
          />
        )}
        {sidebarOptions.harmony && (
          <Area
            type="monotone"
            dataKey="harmony"
            stroke="#4ddfd7"
            fill="url(#colorHarmony)"
            fillOpacity={1}
          />
        )}
        {sidebarOptions.celo && (
          <Area
            type="monotone"
            dataKey="celo"
            stroke="#f3c559"
            fill="url(#colorCelo)"
            fillOpacity={1}
          />
        )}
        {sidebarOptions.fantom && (
          <Area
            type="monotone"
            dataKey="fantom"
            stroke="#1766f7"
            fill="url(#colorFantom)"
            fillOpacity={1}
          />
        )}
        {sidebarOptions.arbitrum && (
          <Area
            type="monotone"
            dataKey="arbitrum"
            stroke="#279ce8"
            fill="url(#colorArbitrum)"
            fillOpacity={1}
          />
        )}
        {sidebarOptions.arbitrum && (
          <Area
            type="monotone"
            dataKey="avalanche"
            stroke="#e24040"
            fill="url(#colorAvalanche)"
            fillOpacity={1}
          />
        )}
      </AreaChart>
    </div>
  );
}
