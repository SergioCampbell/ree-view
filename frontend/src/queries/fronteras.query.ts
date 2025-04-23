import { gql } from "@apollo/client";

export const GET_FRONTERAS = gql`
query GetFronteraByDate($input: FronteraInput!) {
  getIntercambios(input: $input) {
    type
    id
    groupId
    attributes {
      title
      description
      color
      icon
      type
      magnitude
      composite
      lastUpdate
      values {
        value
        percentage
        datetime
      }
      total
      totalPercentage
    }
    country
  }
}`;