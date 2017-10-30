import { gql } from "react-apollo";

/**
 * @desc Get all users from DB
 */
export const GET_USERS_QUERY = gql`
  {
    getUsers {
      name
    }
  }
`;

/**
 * @desc Get a specific user, determined by their 'ID'
 */
export const GET_USER_QUERY = gql`
  query ($email) {
    getUser(email: $email) {
      name
      email
    }
  }
`;
