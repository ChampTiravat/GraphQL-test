import jwt from "jsonwebtoken";

/**
 * @desc Attach an authenticated user(decoded from JWT payload) into apollo-server's context
 */
export const attachUserToApolloContext = async (req, res, next) => {
  const token = await req.headers.authorization;

  if (token) {
    try {
      const user = await jwt.verify(token, "SOME_SECRET_KEY");
      if (!user.email || !user.name) {
        req.user = null;
      }
      req.user = user;
    } catch (err) {
      // Possible Values of err.name
      // 'jwt malformed' === token not provided
      // 'invalid token' === invalided token
      req.user = null;
    }
  }

  next();
};
