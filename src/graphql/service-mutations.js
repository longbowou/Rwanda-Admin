import gql from "graphql-tag";
import { errorFields } from "@/graphql/fragments/global";
import { serviceForViewFields } from "@/graphql/fragments/service";

export const createServiceCategory = gql`
  mutation($input: CreateServiceCategoryInput!) {
    createServiceCategory(input: $input) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;

export const updateServiceCategory = gql`
  mutation($input: UpdateServiceCategoryInput!) {
    updateServiceCategory(input: $input) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;

export const deleteServiceCategory = gql`
  mutation($id: UUID!) {
    deleteServiceCategory(id: $id) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;

export const sortServiceCategories = gql`
  mutation($sorted: [SortedServiceCategoryInputType]!) {
    sortServiceCategories(sorted: $sorted) {
      isSorted
    }
  }
`;

export const publishUnPublishService = gql`
  mutation($input: PublishUnPublishServiceInput!) {
    publishUnPublishService(input: $input) {
      errors {
        ...errorFields
      }
    }
  }
  ${errorFields}
`;

export const acceptService = gql`
  mutation($input: AcceptServiceInput!) {
    acceptService(input: $input) {
      errors {
        ...errorFields
      }
      service {
        ...serviceForViewFields
      }
    }
  }
  ${errorFields}
  ${serviceForViewFields}
`;

export const rejectService = gql`
  mutation($input: RejectServiceInput!) {
    rejectService(input: $input) {
      errors {
        ...errorFields
      }
      service {
        ...serviceForViewFields
      }
    }
  }
  ${errorFields}
  ${serviceForViewFields}
`;
