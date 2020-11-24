import gql from "graphql-tag";

export const processRefund = gql`
  mutation processRefund($id: UUID!) {
    processRefund(id: $id) {
      error
      result
    }
  }
`;
