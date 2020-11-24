import gql from "graphql-tag";
import { errorFields } from "@/graphql/fragments/global";

export const updateParameter = gql`
  mutation updateParameter($input: UpdateParameterInput!) {
    updateParameter(input: $input) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;
