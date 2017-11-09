import React from "react";

import withData from "../core/withData";
import { Form, Input } from "../components/Form";
import { PrimaryButton } from "../components/Button";
import { PageHeading } from "../components/Content";
import {
  ChatMessagesContainer,
  ChatMessage
} from "../components/ChatMessagePanel";
import {
  UnAuthenticatedLayout,
  AuthenticatedLayout
} from "../components/Layout";

const UnAuthenticatedUserContent = () => (
  <UnAuthenticatedLayout>
    <h4>Please login to view the page's content</h4>
  </UnAuthenticatedLayout>
);

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggin: true,
      formData: "",
      messages: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { formData } = this.state;

    if (!formData) {
      alert("Please type something!");
      return;
    }

    this.setState(prevState => ({
      messages: prevState.messages.concat(formData)
    }));
    this.setState({
      formData: ""
    });
  }

  handleChange(e) {
    e.preventDefault();
    const { value } = e.target;
    this.setState({
      formData: value
    });
  }

  render() {
    const { isLoggin, formData, messages } = this.state;
    return isLoggin ? (
      <AuthenticatedLayout>
        <PageHeading>START CHATING WITH YOUR FRIENDS</PageHeading>
        <ChatMessagesContainer>
          {messages.map((message, i) => (
            <ChatMessage key={i}>{message}</ChatMessage>
          ))}
        </ChatMessagesContainer>
        <Form onSubmit={this.handleSubmit}>
          <Input type="text" value={formData} onChange={this.handleChange} />
          <PrimaryButton>Send</PrimaryButton>
        </Form>
      </AuthenticatedLayout>
    ) : (
      <UnAuthenticatedUserContent />
    );
  }
}

export default withData(Index);
