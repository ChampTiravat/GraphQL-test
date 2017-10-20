import React from "react";

import { UnAuthenticatedLayout } from "../components/Layout";
import { PageHeading } from "../components/Content";
import withData from "../core/withData";
import RegisterForm from "../components/RegisterForm";

class Register extends React.Component {
  render() {
    return (
      <UnAuthenticatedLayout>
        <PageHeading>REGISTER FOR AN ACCOUNT</PageHeading>
        <RegisterForm />
      </UnAuthenticatedLayout>
    );
  }
}

export default withData(Register);
