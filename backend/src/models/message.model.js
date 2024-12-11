import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    senderId: {
      type: String, // clerk user ID
      required: true,
    },
    receiverId: {
      type: String, // clerk user ID
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // createdAt, updatedat
);

export const Message = mongoose.model("Message", messageSchema);
