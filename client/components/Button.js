import React from "react";
import styled from "styled-components";

export const DefaultButton = styled.button`
  padding: 1em;
  margin: 0;
  display: inline-block;
  border: none;
  font-family: "Calibri";
  font-size: 1em;
  font-weight: 600;
  color: #fff;
  background-color: #aaa;
`;

export const PrimaryButton = DefaultButton.extend`background-color: blue;`;

export const SuccessButton = DefaultButton.extend`background-color: green;`;
