import { gql } from "@apollo/client";

export const dayDataFieldsQuery = gql`
  fragment dayDataFields on DayData {
    id
    date
    volumeETH
    volumeUSD
    untrackedVolume
    liquidityETH
    liquidityUSD
    txCount
  }
`;

export const pairTokenFieldsQuery = gql`
  fragment pairTokenFields on Token {
    id
    name
    symbol
    totalSupply
    derivedETH
  }
`;
export const pairFieldsQuery = gql`
  fragment pairFields on Pair {
    id
    reserveUSD
    reserveETH
    volumeUSD
    untrackedVolumeUSD
    trackedReserveETH
    token0 {
      ...pairTokenFields
    }
    token1 {
      ...pairTokenFields
    }
    reserve0
    reserve1
    token0Price
    token1Price
    totalSupply
    txCount
    timestamp
  }
  ${pairTokenFieldsQuery}
`;

export const tokenPairsQuery = gql`
  query tokenPairsQuery($id: String!) {
    pairs0: pairs(
      first: 1000
      orderBy: reserveUSD
      orderDirection: desc
      where: { token0: $id }
    ) {
      ...pairFields
      oneDay @client
      sevenDay @client
    }
    pairs1: pairs(
      first: 1000
      orderBy: reserveUSD
      orderDirection: desc
      where: { token1: $id }
    ) {
      ...pairFields
      oneDay @client
      sevenDay @client
    }
  }
  ${pairFieldsQuery}
`;

// export const customDayDatasQuery = gql`
//   query dayDatasQuery($first: Int! = 1000, $date: Int! = 0) {
//     dayDatas(first: $first, orderBy: date, orderDirection: desc) {
//       ...dayDataFields
//     }
//   }
//   ${dayDataFieldsQuery}
// `;

export const customDayDatasQuery = gql`
  query dayDatasQuery($first: Int! = 1000, $date: Int! = 1) {
    dayDatas(first: $first, orderBy: date, orderDirection: asc) {
      ...dayDataFields
    }
  }
  ${dayDataFieldsQuery}
`;

// export const pairsQuery = gql`
//   query pairsQuery(
//     $first: Int! = 10
//     $orderBy: String! = "reserveUSD"
//     $orderDirection: String! = "desc"
//   ) {
//     pairs(first: $first, orderBy: $orderBy, orderDirection: $orderDirection) {
//       ...pairFields
//       oneDay @client
//       sevenDay @client
//     }
//   }
//   ${pairFieldsQuery}
// `;

export const pairsQuery = gql`
  query pairsQuery(
    $first: Int! = 10
    $orderBy: String! = "reserveUSD"
    $orderDirection: String! = "desc"
  ) {
    pairs(first: $first, orderBy: $orderBy, orderDirection: $orderDirection) {
      name
      dayData(orderBy: date, orderDirection: desc){
        volumeUSD
        reserveUSD
        date
      }
      token0{
        symbol
      }
      token1{
        symbol
      }
    }
  }
  ${pairFieldsQuery}
`;