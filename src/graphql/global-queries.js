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

export const queryAccount = gql`
  query queryAccount($id: UUID!) {
    account(id: $id) {
      id
      firstName
      lastName
      username
      email
      phoneNumber
      balance
      servicesCount
      purchasesCount
      ordersCount
      depositsSum
      refundsSum
      earningsSum
      createdAt
    }
  }
`;
