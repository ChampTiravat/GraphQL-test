export default `

    type User {
        id: String!
        name: String!
        email: String!
        password: String!
    }

    type LoginResponse {
        success: Boolean!
        token: String
        error: [String!]
        user: User
    }

    type Query {
        getUser(name: String!): User!
        getUsers: [User]!
    }

    type Mutation {
        registerUser(name: String!, email: String!, password: String!): Boolean!
        login(email: String!, password: String!): LoginResponse!
    }

`;
