export default `
  type User {
    id: String!
    email: String
    name: String!
    roles: [String!]!
    username: String!
  }
  type Query {
    user(id: String!): User
    users: [User]
    hello: String
  }
  type Mutation {
    createUser(username: String!, name: String!, email: String, password: String!, roles: [Role!]!): User
    editUser(id: String, name: String, email: String, password: String, roles: [Role]): User
    deleteUser(id: String): User
  }
`;
