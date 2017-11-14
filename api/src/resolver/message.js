import { PubSub, withFilter } from "graphql-subscriptions";

import Message from "../models/Message";
import { requiredAuth } from "../helpers/permission";

const pubsub = new PubSub();

const NEW_MESSAGE_ADDED_SUBSCRIPTION = "newMessageAdded";

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
        // Creating new messsage
        await Message.create({
          body,
          sender: "tiravat",
          reciever: "",
          chat_room: ""
        });

        // Broadcasting this event. So, everyone can listen to this
        pubsub.publish(NEW_MESSAGE_ADDED_SUBSCRIPTION, {
          newMessageAdded: {
            body,
            sender: "tiravat",
            reciever: "someone",
            chat_room: "123"
          }
        });

        // Send back an operation's status as GraphQL Type Boolean
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  },
  Subscription: {
    newMessageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE_ADDED_SUBSCRIPTION),
        (payload, args) => true
      )
    }
  }
};
