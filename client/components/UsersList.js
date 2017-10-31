import React from "react";
import { graphql } from "react-apollo";

import { GET_USER_QUERY } from "../core/constants/graphql/user";

class UsersList extends React.Component {
  constructor(props) {
    super(props);

    this.renderUserItem = this.renderUserItem.bind(this);
  }

  componentDidMount() {
    //if (this.props.data.getUsers.length === 0) {
    if (process.browser) {
      this.props.data.refetch && this.props.data.refetch();
    }
  }

  renderUserItem() {
    const { data: { loading, getUsers } } = this.props;

    if (loading) {
      return <li>Loading</li>;
    } else {
      if (getUsers) {
        if (getUsers.length > 0) {
          return getUsers.map((user, i) => <li key={i}>{user.name}</li>);
        } else {
          return <li>no user</li>;
        }
      } else {
        return <li>No connection T_T</li>;
      }
    }
  }

  render() {
    return <ul>{this.renderUserItem()}</ul>;
  }
}

export default graphql(GET_USER_QUERY)(UsersList);
