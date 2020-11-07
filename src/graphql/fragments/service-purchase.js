import gql from "graphql-tag";
import { serviceOptionFields } from "@/graphql/fragments/service-option";

export const servicePurchaseFields = gql`
  fragment servicePurchaseFields on ServicePurchaseType {
    id
    number
    price
    basePrice
    status
    delay
    initiated
    accepted
    refused
    delivered
    approved
    inDispute
    canceled
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

export const servicePurchaseChatMessageFields = gql`
  fragment servicePurchaseChatMessageFields on ServicePurchaseChatMessageType {
    id
    isFile
    fileName
    fileUrl
    fileSize
    content
    marked
    fromBuyer
    time
    showDate
    date
    dateDisplay
    createdAt
  }
`;

export const servicePurchaseChatHistoryFields = gql`
  fragment servicePurchaseChatHistoryFields on ServicePurchaseType {
    chatHistory {
      ...servicePurchaseChatMessageFields
    }
  }
  ${servicePurchaseChatMessageFields}
`;

export const servicePurchaseChatFilesHistoryFields = gql`
  fragment servicePurchaseChatFilesHistoryFields on ServicePurchaseType {
    chatFilesHistory {
      ...servicePurchaseChatMessageFields
    }
  }
  ${servicePurchaseChatMessageFields}
`;
