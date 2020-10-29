import gql from "graphql-tag";

export const litigationFields = gql`
  fragment litigationFields on LitigationType {
    id
    title
    content
    decision
    status
    canBeHandled
    opened
    handled
    approved
    canceled
  }
`;
