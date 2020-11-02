import gql from "graphql-tag";
import { litigationFields } from "@/graphql/fragments/litigation";
import {
  servicePurchaseChatHistoryFields,
  servicePurchaseFields,
  servicePurchaseTimelineFields
} from "@/graphql/fragments/service-purchase";

export const queryLitigation = gql`
  query queryLitigation($id: UUID!) {
    litigation(id: $id) {
      ...litigationFields
    }
  }
  ${litigationFields}
`;

export const queryLitigationServicePurchase = gql`
  query queryLitigationServicePurchase($id: UUID!) {
    litigation(id: $id) {
      servicePurchase {
        ...servicePurchaseFields
      }
    }
  }
  ${servicePurchaseFields}
`;

export const queryLitigationServicePurchaseTimelines = gql`
  query queryLitigationServicePurchase($id: UUID!) {
    litigation(id: $id) {
      servicePurchase {
        ...servicePurchaseTimelineFields
      }
    }
  }
  ${servicePurchaseTimelineFields}
`;

export const queryLitigationServicePurchaseChatHistory = gql`
  query queryLitigationServicePurchase($id: UUID!) {
    litigation(id: $id) {
      servicePurchase {
        ...servicePurchaseChatHistoryFields
      }
    }
  }
  ${servicePurchaseChatHistoryFields}
`;
