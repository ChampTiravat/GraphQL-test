// import { createNetworkInterface } from "react-apollo";
import { ApolloClient } from "apollo-client";
import fetch from "isomorphic-fetch";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

const networkInterface = createNetworkInterface({
  uri: "http://localhost:4000/graphql", // Server URL (must be absolute)
  opts: {
    // Additional fetch() options like `credentials` or `headers`
    credentials: "same-origin"
  }
});

/**
 * @desc Applying Apollo-client middleware(s)
 */
networkInterface.use([
  {
    applyMiddleware: (req, next) => {
      if (!req.options.headers) {
        req.options.headers = {}; // If there's no headers object in the request, make one of it!
      }
      const authenticationToken = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : null;
      req.options.headers.authorization = authenticationToken;
      next();
    }
  }
]);

function create() {
  return new ApolloClient({
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    networkInterface
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
