import {gql} from "@apollo/client"
export const ADD_USER = gql`

mutation addUser($firstName: String!, $lastName: String!, $email: String!, $userName: String!, $password: String!) {
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

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const SAVE_SCORE = gql`
mutation Mutation($category: String!, $score: Int!, $userName: String!) {
  addHighScore(category: $category, score: $score, userName: $userName) {
    category
    score
    userName
  }
}`