import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";

import { Form, InputGroup, Input } from "../components/Form";
import { SuccessButton, PrimaryButton } from "../components/Button";
import { LOGIN_MUTATION } from "../core/constants/graphql/user";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
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
        const token = data.login.token;
        localStorage.setItem("token", token);
      })
      .catch(err => {
        console.log(err);
        alert("Sorry, some error occured");
      });
  }

  render() {
    const { email, password } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
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
        <Link href="/register" prefetch>
          <PrimaryButton type="button">Register for an account</PrimaryButton>
        </Link>
        <SuccessButton type="submit">Login</SuccessButton>
      </Form>
    );
  }
}

export default graphql(LOGIN_MUTATION)(LoginForm);
