import React from "react";
import Router from "next/router";

import { UnAuthenticatedLayout } from "../components/Layout";
import { PageHeading } from "../components/Content";

class About extends React.Component {
  componentDidMount() {
    setTimeout(async () => {
      await Router.push("/register");
    }, 2000);
  }

  render() {
    return (
      <UnAuthenticatedLayout>
        <PageHeading>ABOUT</PageHeading>
      </UnAuthenticatedLayout>
    );
  }
}

export default About;
