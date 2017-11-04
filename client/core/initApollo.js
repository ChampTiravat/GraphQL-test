import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "isomorphic-fetch";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

/**
 * @desc Constructing a Apollo Network Interface
 */
const HTTPLink = createHttpLink({
  uri: "http://localhost:4000/graphql", // Server URL (must be absolute)
  credentials: "same-origin" // Additional fetch() options like `credentials` or `headers`
});

/**
 * @desc Applying Apollo-client middleware(s)
 */
const middlewareLink = setContext(() => ({
  headers: {
    authorization: localStorage.getItem("token") || ""
  }
}));

const link = middlewareLink.concat(HTTPLink);

function create() {
  return new ApolloClient({
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link,
    cache: new InMemoryCache()
  });
}

export default function initApollo() {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create();
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create();
  }

  return apolloClient;
}
