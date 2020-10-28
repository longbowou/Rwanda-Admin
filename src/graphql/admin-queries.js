import gql from "graphql-tag";
import { adminFields } from "@/graphql/fragments/admin";

export const queryAdmin = gql`
  query {
    admin {
      ...adminFields
    }
  }
  ${adminFields}
`;
