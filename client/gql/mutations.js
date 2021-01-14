import gql from 'graphql-tag'

const logout = gql`
  mutation {
    logout {
      id
      email
    }
  }
`;

const login = gql`
 mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      email
    }
 }
`

const signup = gql`
  mutation Signup($email: String, $password: String) {
    signup(email: $email, password: $password) {
      id
      email
    }
  }
`

export {
  logout,
  login,
  signup
}
