import gql from "graphql-tag";

export const adminFields = gql`
  fragment adminFields on AdminType {
    id
    fullName
    email
    firstName
    lastName
    username
  }
`;
