import React from "react";
import styled from "styled-components";

import { Form, Input } from "../components/Form";
import { PrimaryButton } from "../components/Button";
import { PageHeading } from "../components/Content";
import {
  UnAuthenticatedLayout,
  AuthenticatedLayout
} from "../components/Layout";
import withData from "../core/withData";

const ChatMessagesContainer = styled.ul`
  width: 100%;
  background-color: lightblue;
  height: 400px;
  padding: 0;
  overflow-y: scroll;
`;

const ChatMessage = styled.li`
  padding: 1em;
  display: block;
  font-size: 0.9em;
  border: 2px solid #fff;
`;

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
