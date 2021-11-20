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

export const customDayDatasQuery = gql`
  query dayDatasQuery($first: Int! = 1000, $date: Int! = 0) {
    dayDatas(first: $first, orderBy: date, orderDirection: desc) {
      ...dayDataFields
    }
  }
  ${dayDataFieldsQuery}
`;