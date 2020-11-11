import gql from "graphql-tag";
import { serviceOptionFields } from "@/graphql/fragments/service-option";

export const queryServicesForPreview = gql`
  query {
    services {
      id
      title
      account {
        fullName
      }
    }
  }
`;

export const queryServiceCategories = gql`
  query {
    serviceCategories {
      id
      label
    }
  }
`;

export const queryServiceForDetail = gql`
  query service($id: UUID!) {
    service(id: $id) {
      id
      title
      content
      delay
      delayDisplay
      keywords
      stars
      createdAt
      optionsCount
      optionsCountDisplay
      basePrice
      published
      serviceCategory {
        id
        label
      }
      account {
        fullName
      }
      servicemediaSet {
        fileUrl
        url
      }
      options {
        ...serviceOptionFields
      }
    }
  }
  ${serviceOptionFields}
`;

export const queryServiceForView = gql`
  query service($id: UUID!) {
    service(id: $id) {
      id
      title
      content
      delayDisplay
      keywords
      createdAt
      publishedDisplay
      serviceCategory {
        label
      }
    }
  }
`;

export const queryServiceForEdit = gql`
  query service($id: UUID!) {
    service(id: $id) {
      id
      title
      content
      delay
      keywords
      published
      serviceCategory {
        id
      }
    }
  }
`;

export const queryServiceCategoryForEdit = gql`
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

export const queryServiceOrderPreview = gql`
  query serviceOrderPreview($service: UUID!, $serviceOptions: [UUID!]) {
    serviceOrderPreview(service: $service, serviceOptions: $serviceOptions) {
      totalOrderPrice
      totalOrderPriceTtc
      cannotPayWithWallet
      basePrice
      commission
      commissionTva
      totalPrice
      totalPriceTva
      deadlineAt
      totalDelay
      serviceOptions {
        id
        label
        price
        delayPreviewDisplay
      }
      service {
        id
        title
        serviceCategory {
          label
        }
      }
    }
  }
`;
