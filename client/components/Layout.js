import styled from "styled-components";

import Navbar from "./Navbar";

/**
 *  @desc Main Container for all page components
 */
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: #eee;
`;

/**
 *  @desc Main Layout for page components(use this if user is not authenticated) 
 *  @param props.children : Child Components 
 */
export const UnAuthenticatedLayout = ({ children }) => (
  <Container>
    <Navbar />
    <br />
    <h3>Please signin to view the full content</h3>
    <div>{children}</div>
  </Container>
);

/**
 *  @desc Main Layout for page components(use this if user is authenticated) 
 *  @param props.children : Child Components 
 */
export const AuthenticatedLayout = ({ children }) => (
  <Container>
    <Navbar />
    <div>{children}</div>
  </Container>
);
