import gql from "graphql-tag";
import { errorFields } from "@/graphql/fragments/global";

export const processRefund = gql`
  mutation processRefund($id: UUID!) {
    processRefund(id: $id) {
      error
      result
    }
  }
`;

export const refuseRefund = gql`
  mutation refuseRefund($input: RefuseRefundInput!) {
    refuseRefund(input: $input) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;

export const createRefundWay = gql`
  mutation createRefundWay($input: CreateRefundWayInput!) {
    createRefundWay(input: $input) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;

export const updateRefundWay = gql`
  mutation updateRefundWay($input: UpdateRefundWayInput!) {
    updateRefundWay(input: $input) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;

export const deleteRefundWay = gql`
  mutation deleteRefundWay($id: UUID!) {
    deleteRefundWay(id: $id) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;
