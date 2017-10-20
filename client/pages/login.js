import React from "react";

import { UnAuthenticatedLayout } from "../components/Layout";
import { PageHeading } from "../components/Content";
import withData from "../core/withData";
import LoginForm from "../components/LoginForm";

class Register extends React.Component {
  render() {
    return (
      <UnAuthenticatedLayout>
        <PageHeading>LOGIN TO IDENTIFY YOURSELF</PageHeading>
        <LoginForm />
      </UnAuthenticatedLayout>
    );
  }
}

export default withData(Register);
