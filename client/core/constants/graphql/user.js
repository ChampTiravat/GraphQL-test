import { gql } from "react-apollo";

/**
 * @desc Get all users from DB
 * @return type : [User!]
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
 * @param $email : User specific email
 * @return type : User
 */
export const GET_USER_QUERY = gql`
  query($email: String!) {
    getUser(email: $email) {
      name
      email
    }
  }
`;

/**
 * @desc Login Mutation 
 * @param $email : User specific email
 * @param $password : A password which associated to a particular user 
 * @return type : LoginResponse
 */
export const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      error
      token
      user {
        name
        email
      }
    }
  }
`;
