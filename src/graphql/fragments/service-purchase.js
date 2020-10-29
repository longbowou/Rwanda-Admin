import gql from "graphql-tag";
import { serviceOptionFields } from "@/graphql/fragments/service-option";

export const servicePurchaseFields = gql`
  fragment servicePurchaseFields on ServicePurchaseType {
    id
    number
    price
    status
    delay
    initiated
    accepted
    refused
    delivered
    approved
    inDispute
    updateInitiated
    updateAccepted
    updateRefused
    updateDelivered
    deadlineAt
    service {
      id
      title
      account {
        username
      }
    }
    account {
      username
    }
    serviceOptions {
      ...serviceOptionFields
    }
  }
  ${serviceOptionFields}
`;

export const servicePurchaseTimelineFields = gql`
  fragment servicePurchaseTimelineFields on ServicePurchaseType {
    timelines {
      happenAt
      status
      color
      description
    }
  }
`;
