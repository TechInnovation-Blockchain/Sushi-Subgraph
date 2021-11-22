import React from "react";
import {
  AreaChart,
  Area,
  // XAxis,
  // YAxis,
  // CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

export default function NewGraph({ sidebarOptions, allData, width, height }) {
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

  console.log("allData", allData);

  const ethereum = updatedData["ethereum"]?.map((item) => ({
    ethereum: item.liquidityETH / 100,
  }));
  const bsc = updatedData["bsc"]?.map((item) => ({
    bsc: item.liquidityETH / 1,
  }));
  const moonriver = updatedData["moonriver"]?.map((item) => ({
    moonriver: item.liquidityETH,
  }));
  const xdai = updatedData["xdai"]?.map((item) => ({
    xdai: item.liquidityETH / 1000,
  }));
  const polygon = updatedData["polygon"]?.map((item) => ({
    polygon: item.liquidityETH / 10,
  }));
  const harmony = updatedData["harmony"]?.map((item) => ({
    harmony: item.liquidityETH / 100000,
  }));
  const celo = updatedData["celo"]?.map((item) => ({
    celo: item.liquidityETH / 1000,
  }));
  const fantom = updatedData["fantom"]?.map((item) => ({
    fantom: item.liquidityETH / 1000,
  }));
  const arbitrum = updatedData["arbitrum"]?.map((item) => ({
    arbitrum: item.liquidityETH / 10,
  }));

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
  }));

  console.log("finalData", finalData);
  console.log("sidebarOptions", sidebarOptions);

  return (
    <div>
      <AreaChart
        width={width || 600}
        height={height || 400}
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
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        {sidebarOptions.ethereum && (
          <Area
            type="monotone"
            dataKey="ethereum"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
          />
        )}
        {sidebarOptions.bsc && (
          <Area
            type="monotone"
            dataKey="bsc"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.3}
          />
        )}
        {sidebarOptions.moonriver && (
          <Area
            type="monotone"
            dataKey="moonriver"
            stroke="red"
            fill="red"
            fillOpacity={0.3}
          />
        )}
        {sidebarOptions.xdai && (
          <Area
            type="monotone"
            dataKey="xdai"
            stroke="green"
            fill="green"
            fillOpacity={0.3}
          />
        )}
        {sidebarOptions.polygon && (
          <Area
            type="monotone"
            dataKey="polygon"
            stroke="blue"
            fill="blue"
            fillOpacity={0.3}
          />
        )}
        {sidebarOptions.harmony && (
          <Area
            type="monotone"
            dataKey="harmony"
            stroke="gray"
            fill="gray"
            fillOpacity={0.3}
          />
        )}
        {sidebarOptions.celo && (
          <Area
            type="monotone"
            dataKey="celo"
            stroke="tomato"
            fill="tomato"
            fillOpacity={0.3}
          />
        )}
        {sidebarOptions.fantom && (
          <Area
            type="monotone"
            dataKey="fantom"
            stroke="cyan"
            fill="cyan"
            fillOpacity={0.3}
          />
        )}
        {sidebarOptions.arbitrum && (
          <Area
            type="monotone"
            dataKey="arbitrum"
            stroke="#bdbdbd"
            fill="#bdbdbd"
            fillOpacity={0.3}
          />
        )}

        {/* <Area
          type={cardinal}
          dataKey="pv"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.3}
        /> */}
      </AreaChart>

      <style>{`
      // .recharts-wrapper {
      //   position: relative;
      // }
      
      // .recharts-default-legend {
      //   /* position: absolute; */
      //   position: relative;
      //   top: -24rem;
      //   left: -12rem;
      // }
    `}</style>
    </div>
  );
}
