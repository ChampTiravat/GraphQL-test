import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";

import User from "../models/User";
import { requiredAuth } from "../helpers/permission";

export default {
  Query: {
    /**
     * @desc Get a user which has the same name as the args.name
     * @return GraphQL User
     */
    getUser: requiredAuth.createResolver(async (parent, { name }, context) => {
      try {
        return await User.findOne({ name });
      } catch (err) {
        return null;
      }
    }),
    /**
     * @desc Get all users from database
     * @return GrpahQL [User]
     */
    getUsers: requiredAuth.createResolver(async (parent, args, { user }) => {
      try {
        const users = await User.find({});
        console.log("Sending getUsers");
        console.log(users);
        return users;
      } catch (err) {
        return {
          success: false,
          token: null,
          error: ["Other exception"],
          user: []
        };
      }
    })
  },
  Mutation: {
    /**
     * @desc User Registration Mution
     * @arg parentValue : default value
     * @arg args : arguments passed from graphql client when the mutation is triggered
     * @arg context : apollo-client's context data
     * @return GraphQL Boolean
     */
    registerUser: async (parent, { name, email, password }, context, info) => {
      try {
        const salt = await bcrypt.genSaltSync(12);
        const hashedPassword = await bcrypt.hashSync(password, salt);

        await User.create({
          name,
          email,
          password: hashedPassword
        });

        return true;
      } catch (err) {
        if (err) {
          console.log(err);
        }
        return false;
      }
    },
    /**
     * @desc Login Mution
     * @arg parentValue : default value
     * @arg args : arguments passed from graphql client when the mutation is triggered
     * @arg context : apollo-client's context data
     * @return GraphQL type named LoginResponse
     */
    login: async (parent, { email, password }, context, info) => {
      try {
        // Find a user with a specific email in DB
        const user = await User.findOne({ email });

        if (user) {
          // User seem to be appeared in DB
          const isPasswordValid = await bcrypt.compareSync(
            password,
            user.password
          );
          if (isPasswordValid) {
            // Success! Everything is valid. Create a token and send it back to the user
            const { email, name } = user;
            const token = jwt.sign({ email, name }, "SOME_SECRET_KEY", {
              expiresIn: 60 * 60 * 2 // 2 hours
            });
            return {
              success: true,
              token: token,
              error: null,
              user: user
            };
          } else {
            // Password is not valid
            return {
              success: false,
              error: ["Wrong password"],
              user: null
            };
          }
        } else {
          // No user with the provided email
          return {
            success: false,
            error: ["No user with the provided email"],
            user: null
          };
        }
      } catch (err) {
        return {
          success: false,
          error: [err],
          user: null
        };
      }
    }
  }
};
