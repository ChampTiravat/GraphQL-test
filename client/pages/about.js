import React from "react";

import { UnAuthenticatedLayout } from "../components/Layout";
import { PageHeading } from "../components/Content";

class About extends React.Component {
  render() {
    return (
      <UnAuthenticatedLayout>
        <PageHeading>ABOUT</PageHeading>
      </UnAuthenticatedLayout>
    );
  }
}

export default About;
