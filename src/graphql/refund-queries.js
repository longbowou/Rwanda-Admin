import gql from "graphql-tag";

export const queryRefundWay = gql`
  query refundWay($id: UUID!) {
    refundWay(id: $id) {
      id
      name
      countryCode
      published
    }
  }
`;
