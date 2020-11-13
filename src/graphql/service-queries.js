import gql from "graphql-tag";

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
