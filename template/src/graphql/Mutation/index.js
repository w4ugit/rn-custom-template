import {gql} from '@apollo/client';

export const LOGIN = gql(`
  mutation ($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      refreshToken
      payload
    }
  }
`);

export const SIGN = gql(`
  mutation ($firstName: String!, $lastName: String!, $sex: Int!, $birthday: String!, $phone: String!, $email: String!, $about: String!, $image: String, $password: String!) {
    createUser(firstName: $firstName, lastName: $lastName, sex: $sex, birthday: $birthday, phone: $phone, email: $email, about: $about, image: $image, password: $password) {
      profile {
        username
        sub
        firstName
        lastName
        email
        sex
        birthday
        phone
        about
        image
        lang
      }
      success
      error
      token
      refreshToken
    }
  }
`);
