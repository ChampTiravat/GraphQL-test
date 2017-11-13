export default `

    type Message {
        body: String!
        sender: User!
        reciever: User!
        chat_room: String!
    }

    type Subscription {
        newMessageAdded(body: String!, reciever: String!, chat_room: String): Message!
    }

    type Query {
        getMessages: [Message!]
    }

    type Mutation {
        createMessage(body: String!, reciever: String): Boolean!
    }

`;
