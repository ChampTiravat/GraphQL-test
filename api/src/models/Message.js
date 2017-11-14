import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true
  },
  sender: String,
  reciever: String,
  chat_room: String
});

export default mongoose.model("messages", MessageSchema);
