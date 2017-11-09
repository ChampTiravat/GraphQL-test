import React from "react";

import { PageHeading } from "../components/Content";
import {
  UnAuthenticatedLayout,
  AuthenticatedLayout
} from "../components/Layout";
import withData from "../core/withData";

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
        <ul>{messages.map((message, i) => <li key={i}>{message}</li>)}</ul>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={formData} onChange={this.handleChange} />
          <button>Send</button>
        </form>
      </AuthenticatedLayout>
    ) : (
      <UnAuthenticatedUserContent />
    );
  }
}

export default withData(Index);
