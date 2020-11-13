import gql from "graphql-tag";
import { serviceForViewFields } from "@/graphql/fragments/service";

export const queryServiceForView = gql`
  query service($id: UUID!) {
    service(id: $id) {
      ...serviceForViewFields
    }
  }
  ${serviceForViewFields}
`;
export const queryServiceCategory = gql`
  query serviceCategory($id: UUID!) {
    serviceCategory(id: $id) {
      id
      label
      description
    }
  }
`;

export const queryServiceBasicFields = gql`
  query service($id: UUID!) {
    service(id: $id) {
      id
      title
    }
  }
`;
