import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";

import { Form, InputGroup, Input } from "../components/Form";
import { SuccessButton, PrimaryButton } from "../components/Button";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    name: "",
    email: "",
    password: ""
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.table(this.state);
    this.props
      .mutate({
        variables: {
          ...this.state
        }
      })
      .then(({ data }) => {
        console.table(data);
        if (data.registerUser === true) {
          alert(`${this.state.name} has been registered!`);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { name, email, password } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <InputGroup>
          <Input
            value={name}
            onChange={this.handleChange}
            type="text"
            placeholder="Name"
            name="name"
          />
        </InputGroup>
        <InputGroup>
          <Input
            value={email}
            onChange={this.handleChange}
            type="email"
            placeholder="Email"
            name="email"
          />
        </InputGroup>
        <InputGroup>
          <Input
            value={password}
            onChange={this.handleChange}
            type="password"
            placeholder="Password"
            name="password"
          />
        </InputGroup>
        <Link href="/login" prefetch>
          <PrimaryButton type="button">Login</PrimaryButton>
        </Link>
        <SuccessButton type="submit">Submit</SuccessButton>
      </Form>
    );
  }
}

const registerUserMutation = gql`
  mutation registerUser($name: String!, $email: String!, $password: String!) {
    registerUser(name: $name, email: $email, password: $password)
  }
`;

export default graphql(registerUserMutation)(RegisterForm);
