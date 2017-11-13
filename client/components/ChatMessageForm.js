import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { Form, Input } from "../components/Form";
import { PrimaryButton } from "../components/Button";

class ChatMessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { formData } = this.state;

    if (!formData) {
      alert("Please type something!");
      return;
    }

    // perform graphql mutation here
    this.props
      .mutate({
        variables: {
          body: formData
        }
      })
      .then(({ data }) => {
        if (data.createMessage === true) {
          //alert(`Message has been sent!`);
          console.log(`Message has been sent!`);
        }

        this.setState({
          formData: ""
        });
      })
      .catch(err => {
        console.log(err);
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
    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          type="text"
          value={this.state.formData}
          onChange={this.handleChange}
        />
        <PrimaryButton>Send</PrimaryButton>
      </Form>
    );
  }
}

const CREATE_NEW_MESSAGE_MUTATION = gql`
  mutation($body: String!) {
    createMessage(body: $body)
  }
`;

export default graphql(CREATE_NEW_MESSAGE_MUTATION)(ChatMessageForm);
