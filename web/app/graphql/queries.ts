import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      created_at
      modified_at
    }
  }
`

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      telephones {
        number
        area_code
      }
      created_at
      modified_at
    }
  }
`

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      telephones {
        number
        area_code
      }
      created_at
      modified_at
    }
  }
`

export const SEARCH_USERS = gql`
  query SearchUsers($name: String!) {
    searchUsers(name: $name) {
      id
      name
      email
      telephones {
        number
        area_code
      }
      created_at
      modified_at
    }
  }
`