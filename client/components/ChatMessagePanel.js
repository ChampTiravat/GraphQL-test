import styled from "styled-components";

export const ChatMessagesContainer = styled.ul`
  width: 100%;
  background-color: lightblue;
  height: 400px;
  padding: 0;
  overflow-y: scroll;
`;

export const ChatMessage = styled.li`
  padding: 1em;
  display: block;
  font-size: 0.9em;
  border: 2px solid #fff;
`;
