/**
 * @file Serves as a Mongoose model representing a Message.
 */

import MessageSchema from "./MessageSchema";
import mongoose from "mongoose";

/**
 * @const {model} MessageModel represents a Mongoose MessageModel to
 * be used for Atlas database storage and interaction.
 */

const MessageModel = mongoose.model("MessageModel", MessageSchema);
export default MessageModel