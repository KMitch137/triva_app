import { gql } from "@apollo/client";

export const GET_HIGHSCORES = gql`
  query Query {
    highscores {
      category
      score
      userName
    }
  }
`;
