import React from "react";
import { graphql } from "react-apollo";

import { GET_USERS_QUERY } from "../core/constants/graphql/user";

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.renderUserItem = this.renderUserItem.bind(this);
  }

  componentDidMount() {
    if (process.browser) {
      this.props.data.refetch && this.props.data.refetch();
    }
  }

  renderUserItem() {
    const { data: { loading, getUsers } } = this.props;

    let users
    
    if (getUsers) {
      if (getUsers.length > 0) {
        users = getUsers.map((user, i) => <li key={i}>{user.name}</li>);
      } else {
        users = <li>no user in DB</li>;
      }
    }

    return loading ? <li>Loading</li> : users

  }

  render() {
    return <ul>{this.renderUserItem()}</ul>;
  }

}

export default graphql(GET_USERS_QUERY)(UsersList);
