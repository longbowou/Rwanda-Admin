import gql from "graphql-tag";

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
      isActive
      isActiveDisplay
      createdAt
    }
  }
`;
