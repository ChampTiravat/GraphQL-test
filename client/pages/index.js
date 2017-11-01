import React from "react";
import styled from "styled-components";
import JWTDecode from 'jwt-decode'

import { PageHeading } from "../components/Content";
import { UnAuthenticatedLayout, AuthenticatedLayout } from "../components/Layout";
import { validateToken } from '../helpers/security'
import UsersList from "../components/UsersList";
import withData from "../core/withData";

const UnAuthenticatedUserContent = () => (
  <UnAuthenticatedLayout>
    <h4>Please login to view the page's content</h4>
  </UnAuthenticatedLayout>
)

const AuthenticatedUserContent = () => (
  <AuthenticatedLayout>
    <PageHeading>HEY! HERE'RE YOUR FRIENDS</PageHeading>
    <UsersList />
  </AuthenticatedLayout>
)

class Index extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoggin: false
    }

    
  }

  componentDidMount() {

    if (process.browser) {
      const token = localStorage.getItem('token')

      if (!token) { 
        this.setState({isLoggin: false})
      }

      // Verifying whether the current user is already authenticated or not
      try {
        JWTDecode(token)
        this.setState({
          isLoggin: true
        })
      } catch(err) {
        console.log(err)
        console.error('cannot decode the token, for some reason ;(')
        this.setState({
          isLoggin: false
        })
      }
    }
  }

  render() {
    const { isLoggin } = this.state
    return isLoggin ? <AuthenticatedUserContent /> : <UnAuthenticatedUserContent /> 
  }
  
}
 
export default withData(Index);
