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
  avalanche_client,
} from "apollo/client";

const networkItems = [
  {
    name: "ethereum",
    url: "https://analytics.sushi.com",
    apollo_client: ethereum_client,
    defaultSelected: false,
    color: "#5f7ae3"
  },
  {
    name: "bsc",
    url: "https://analytics-bsc.sushi.com",
    apollo_client: bsc_client,
    defaultSelected: true,
    color: "#e8b611"
  },
  {
    name: "moonriver",
    url: "https://analytics-moonriver.sushi.com",
    apollo_client: moonriver_client,
    defaultSelected: true,
    color: "#da1377"
  },
  {
    name: "xdai",
    url: "https://analytics-xdai.sushi.com",
    apollo_client: xdai_client,
    defaultSelected: true,
    color: "#10a590"
  },
  {
    name: "polygon",
    url: "https://analytics-polygon.sushi.com",
    apollo_client: polygon_client,
    defaultSelected: true,
    color: "#7e46de"
  },
  {
    name: "harmony",
    url: "https://analytics-harmony.sushi.com",
    apollo_client: harmony_client,
    defaultSelected: true,
    color: "#4ddfd7"
  },
  {
    name: "celo",
    url: "https://analytics-celo.sushi.com",
    apollo_client: celo_client,
    defaultSelected: true,
    color: "#f3c559"
  },
  {
    name: "fantom",
    url: "https://analytics-fantom.sushi.com",
    apollo_client: fantom_client,
    defaultSelected: true,
    color: "#1766f7"
  },
  {
    name: "arbitrum",
    url: "https://analytics-arbitrum.sushi.com",
    apollo_client: arbitrum_client,
    defaultSelected: true,
    color: "#279ce8"
  },
  {
    name: "avalanche",
    url: "https://analytics-avalanche.sushi.com",
    apollo_client: avalanche_client,
    defaultSelected: true,
    color: "#e24040"
  },
];

export default networkItems;
