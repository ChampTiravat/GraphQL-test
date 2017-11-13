import React from "react";

import withData from "../core/withData";
import ChatMessagesBox from "../components/ChatMessagesBox";
import ChatMessageForm from "../components/ChatMessageForm";
import { PageHeading } from "../components/Content";
import {
  UnAuthenticatedLayout,
  AuthenticatedLayout
} from "../components/Layout";

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggin: true
    };
  }

  render() {
    return this.state.isLoggin ? (
      <AuthenticatedLayout>
        <PageHeading>START CHATING WITH YOUR FRIENDS</PageHeading>
        <ChatMessagesBox />
        <ChatMessageForm />
      </AuthenticatedLayout>
    ) : (
      <UnAuthenticatedLayout>
        <h4>Please login to view the page's content</h4>
      </UnAuthenticatedLayout>
    );
  }
}

export default withData(Chatroom);
