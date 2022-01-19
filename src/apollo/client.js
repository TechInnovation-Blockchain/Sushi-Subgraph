import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

export const ethereum_client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/sushiswap/exchange",
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
});

export const bsc_client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/sushiswap/bsc-exchange",
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
});

export const moonriver_client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/sushiswap/moonriver-exchange",
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
});

export const xdai_client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/sushiswap/xdai-exchange",
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
});

export const polygon_client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange",
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
});

export const harmony_client = new ApolloClient({
  link: new HttpLink({
    uri: "https://sushi.graph.t.hmny.io/subgraphs/name/sushiswap/harmony-exchange",
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
});

export const celo_client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/sushiswap/celo-exchange",
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
});

export const fantom_client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/sushiswap/fantom-exchange",
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
});

export const arbitrum_client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/sushiswap/arbitrum-exchange",
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
});

export const avalanche_client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/sushiswap/avalanche-exchange",
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
});
