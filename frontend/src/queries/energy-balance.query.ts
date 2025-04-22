import { gql } from '@apollo/client';

export const GET_ENERGY_DATA = gql`
  query GetEnergyData($input: EnergyBalanceInput!) {
    getEnergyBalances(input: $input) {
      startDate
        endDate
        id
      type
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
      createdAt
      updatedAt
    }
  }
`;