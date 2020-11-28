import gql from "graphql-tag";
import { errorFields } from "@/graphql/fragments/global";

export const updateAccount = gql`
  mutation($input: UpdateAccountInput!) {
    updateAccount(input: $input) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;
