import express from "express";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import bluebird from "bluebird";

import { attachUserToApolloContext } from "./helpers/authentication";

const app = express();

/**
 * @desc Mongoose Connection and its configurations
 */
mongoose.connect("mongodb://172.17.0.2:27017/main_db", {
  useMongoClient: true
});
mongoose.Promise = bluebird;

/**
 * @desc Enable CORS to all URI path
 */
app.use(cors("*"));

/**
 * @desc Merge GraphQL schemas and resolvers
 */
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "schema")));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, "resolver")));
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

/**
 * @desc GraphQL establishment
 */
app.use(
  "/graphql",
  bodyParser.json(),
  attachUserToApolloContext,
  (req, res, next) => {
    if (req.user) {
      console.log('Current user :' + req.user.name);
    }
    next();
  },
  graphqlExpress(req => ({
    schema,
    debug: true,
    context: {
      user: req.user || null
    }
  }))
);

/**
 * @desc GraphiQL establishment
 */
app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

app.listen(4000, err => {
  console.log(`=                             =`);
  console.log(`===============================`);
  console.log(`= Server started at port 4000 =`);
  console.log(`===============================`);
  console.log(`=                             =`);
});
