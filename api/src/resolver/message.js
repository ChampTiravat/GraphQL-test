import { PubSub } from "graphql-subscriptions";

import Message from "../models/Message";
import { requiredAuth } from "../helpers/permission";

export default {
  Query: {
    getMessages: async (parent, args, context, info) => {
      try {
        return await Message.find({});
      } catch (err) {
        throw new Error(err.getMessages);
      }
    }
  },
  Mutation: {
    createMessage: async (parent, { body }, { user }, info) => {
      try {
        await Message.create({
          body,
          sender: "tiravat",
          reciever: "",
          chat_room: ""
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  },
  Subscription: {}
};
