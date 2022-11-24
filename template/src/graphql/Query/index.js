import {gql} from '@apollo/client';

export const PROFILE = gql(`
  query {
    profile {
      id
      firstName
      lastName
      email
      profile {
        image
        sex
        phone
        birthday
        about
      }
    }
  }
`);

export const MASTERS = gql(`
  query($category: Int!, $type: Int!) {
    masters(category: $category, type: $type) {
      id
      first_name
      name
      main_image
      count_review
      categories_name
      raiting
    }
  }
`);

export const MASTER = gql(`
  query($id: Int!, $user_id: Int) {
    master(id: $id) {
      id
      first_name
      name
      main_image
      count_review
      categories_name
      raiting
    }
    serviceCart(master_id:$id, user_id: $user_id) {
      id
      service_id
      user_id
    }
  }
`);
