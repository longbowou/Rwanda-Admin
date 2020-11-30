import gql from "graphql-tag";

export const serviceForViewFields = gql`
  fragment serviceForViewFields on ServiceType {
    id
    title
    fileUrl
    content
    delayDisplay
    keywords
    createdAt
    accepted
    rejected
    published
    publishedDisplay
    submittedForApproval
    canBeAccepted
    canBeRejected
    status
    rejectedReason
    serviceCategory {
      label
    }
    account {
      firstName
    }
  }
`;
