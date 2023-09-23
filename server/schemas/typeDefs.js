const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Auth {
      token: ID
      user: User
  }

  type HighScore {
    category: String!
    score: Int
    userName: String!
  }

  type User {
    firstName: String!
    lastName: String!
    email: String!
    userName: String!
    scores: [HighScore]
  }

  type Query {
    highscores: [HighScore]
    user: User
  }

  type Mutation {
    addUser(
      firstName: String!,
      lastName: String!,
      email: String!,
      userName: String!,
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    # can add anything to be updated on User if we want
    updateUser(_id: ID!, firstName: String, lastName: String, userName: String): User
    addHighScore(
      category: String!,
      score: Int!,
      userName: String!
      ): HighScore
  }
`;

module.exports = typeDefs;