import gql from "graphql-tag";

export const errorFields = gql`
  fragment errorFields on ErrorType {
    field
    messages
  }
`;

export const authTokenFields = gql`
  fragment authFields on AuthType {
    token
    refreshToken
    tokenExpiresIn
  }
`;
