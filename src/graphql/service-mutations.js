import gql from "graphql-tag";
import { errorFields } from "@/graphql/fragments/global";

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

export const createService = gql`
    mutation($input: CreateServiceInput!) {
        createService(input: $input) {
            errors {
                ...errorFields
            }
           
        }
    }
    ${errorFields}

`;

export const updateService = gql`
    mutation($input: UpdateServiceInput!) {
        updateService(input: $input) {
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


export const deleteService = gql`
    mutation($id: UUID!) {
        deleteService(id: $id) {
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
