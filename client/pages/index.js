import React from "react";
import styled from "styled-components";

import { PageHeading } from "../components/Content";
import { UnAuthenticatedLayout } from "../components/Layout";
import UsersList from "../components/UsersList";
import withData from "../core/withData";

class Index extends React.Component {
  render() {
    return (
      <UnAuthenticatedLayout>
        <PageHeading>HEY! HERE'RE YOUR FRIENDS</PageHeading>
        <UsersList />
      </UnAuthenticatedLayout>
    );
  }
}

export default withData(Index);
