import {gql} from "@apollo/client"
export const ADD_USER = gql`
mutation AddUser($firstName: String!, $lastName: String!, $email: String!, $userName: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, userName: $userName, password: $password) {
      token
      user {
        firstName
        lastName
        email
        userName
        scores {
          category
          score
          userName
        }
      }
    }
  }
`