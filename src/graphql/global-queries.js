import gql from "graphql-tag";

export const queryParameters = gql`
  query {
    parameters {
      basePrice
      currency
    }
  }
`;

export const queryStats = gql`
  query {
    stats {
      servicesCount
      servicesAcceptedCount
      disputesCount
      disputesNotHandledCount
      refundsCount
      refundsNotProcessedCount
      servicePurchasesCount
      servicePurchasesNotApprovedCount
      accountsCount
      commissionsSum
    }
  }
`;
