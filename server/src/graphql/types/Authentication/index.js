export default `
  type Query {
    me: User
    roles: [Role]
  }
  enum Role {
    admin,
    supporter,
    trainer,
    participant,
    none
  }
  type Mutation {
    signup (username: String!, password: String!, name: String!): String
    login (username: String!, password: String!): String
  }
`;
