export default `
    type Post {
        id: String!
        title: String!
        content: String!
        creator: User!
    }

    type Query {
        getPost(id: String!): Post!
    }
`;
