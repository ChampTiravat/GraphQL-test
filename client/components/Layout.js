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
    <div>{children}</div>
  </Container>
);
