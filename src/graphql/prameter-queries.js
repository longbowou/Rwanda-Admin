import gql from "graphql-tag";

export const queryParameter = gql`
  query queryParameter($id: UUID!) {
    parameter(id: $id) {
      id
      label
      value
    }
  }
`;
