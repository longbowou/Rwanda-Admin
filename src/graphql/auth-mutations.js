import gql from "graphql-tag";
import { errorFields } from "@/graphql/fragments/global";
import { adminFields } from "@/graphql/fragments/admin";
import { authTokenFields } from "@/graphql/fragments/global";

export const login = gql`
  mutation($input: LoginInput!) {
    login(input: $input) {
      errors {
        ...errorFields
      }
      admin {
        ...adminFields
      }
      auth {
        ...authFields
      }
    }
  }
  ${errorFields}
  ${adminFields}
  ${authTokenFields}
`;
