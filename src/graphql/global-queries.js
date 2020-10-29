import gql from "graphql-tag";

export const queryParameters = gql`
  query {
    parameters {
      basePrice
      currency
    }
  }
`;
