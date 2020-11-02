import gql from "graphql-tag";
import { errorFields } from "@/graphql/fragments/global";
import { litigationFields } from "@/graphql/fragments/litigation";

export const handleLitigation = gql`
  mutation handleLitigation($input: HandleLitigationInput!) {
    handleLitigation(input: $input) {
      errors {
        ...errorFields
      }
      litigation {
        ...litigationFields
      }
    }
  }
  ${errorFields}
  ${litigationFields}
`;
