import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { ChatMessagesContainer, ChatMessage } from "./ChatMessagePanel";

const NEW_MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription {
    newMessageAdded {
      body
    }
  }
`;

class ChatMessagesBox extends React.Component {
  constructor(props) {
    super(props);
    this.renderChatMessages = this.renderChatMessages.bind(this);
  }

  static async getInitialProps() {
    const messages = await ChatMessagesBox.queryChatMessages();
    console.log(messages);
    return {
      messagesFromSSR: messages
    };
  }

  static async queryChatMessages() {
    return await this.props.data.refetch();
  }

  componentWillMount() {
    this.props.data.subscribeToMore({
      document: NEW_MESSAGE_ADDED_SUBSCRIPTION,
      variables: {},
      updateQuery: (prevData, { subscriptionData }) => {
        console.log("prevData", prevData);
        console.log("subscriptionData", subscriptionData);
        if (!subscriptionData) {
          return prevData;
        }
        return {
          ...prevData,
          getMessages: [
            ...prevData.getMessages,
            subscriptionData.newMessageAdded
          ]
        };
      }
    });
  }

  renderChatMessages() {
    const { messagesFromSSR, data: { getMessages } } = this.props;

    if (messagesFromSSR) {
      return messagesFromSSR.map((message, i) => (
        <ChatMessage key={i}>{message.body}</ChatMessage>
      ));
    } else if (getMessages) {
      return getMessages.map((message, i) => (
        <ChatMessage key={i}>{message.body}</ChatMessage>
      ));
    } else {
      return <li>No messages</li>;
    }
  }

  render() {
    const { getMessages } = this.props.data;
    console.log(this.props.data);
    return (
      <ChatMessagesContainer>{this.renderChatMessages()}</ChatMessagesContainer>
    );
  }
}

const GET_CHAT_MESSAGES_QUERY = gql`
  query {
    getMessages {
      body
    }
  }
`;

export default graphql(GET_CHAT_MESSAGES_QUERY)(ChatMessagesBox);
