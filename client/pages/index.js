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

if (process.browser) {
      const token = localStorage.getItem('token')

      if (!token) { 
        this.setState({isLoggin: false})
      }

      try {
        JWTDecode(token)
        
      } catch(err) {
        console.log(err)
        console.error('cannot decode the token, for some reason ;(')
      }

    }
  }

  render() {
    const { isLoggin } = this.state
    return isLoggin ? <AuthenticatedUserContent /> : <UnAuthenticatedUserContent /> 
  }
  
}
 
export default withData(Index);
