import React from "react";
import styled from "styled-components";
import Link from "next/link";

const NavbarContainer = styled.nav`
  width: 100%;
  height: 50px;
  margin-bottom: 2em;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 7px 20px rgba(0, 0, 0, 0.2);
`;

const NavbarPanel = styled.ul`background-color: green;`;

const NavbarLinkItem = styled.li`
  padding: 0;
  margin: 0;
  display: inline-block;
  &:hover {
    background-color: darkgreen;
  }
`;

const NavbarLinkText = styled.a`
  color: #fff;
  display: inline-block;
  cursor: pointer;
  padding: 1em 3em;
  font-size: 1.2em;
  font-family: "Calibri";
`;

/**
 * @desc Main navigation bar for every pages component
 */
const Navbar = () => (
  <NavbarContainer>
    <NavbarPanel>
      <NavbarLinkItem>
        <Link href="/" prefetch>
          <NavbarLinkText>Home</NavbarLinkText>
        </Link>
      </NavbarLinkItem>
      <NavbarLinkItem>
        <Link href="/about" prefetch>
          <NavbarLinkText>About</NavbarLinkText>
        </Link>
      </NavbarLinkItem>
      <NavbarLinkItem>
        <Link href="/register" prefetch>
          <NavbarLinkText>Register</NavbarLinkText>
        </Link>
      </NavbarLinkItem>
      <NavbarLinkItem>
        <Link href="/login" prefetch>
          <NavbarLinkText>Login</NavbarLinkText>
        </Link>
      </NavbarLinkItem>
    </NavbarPanel>
  </NavbarContainer>
);

export default Navbar;
