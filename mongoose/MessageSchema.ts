/**
 * @file Serves as a Mongoose Schema for Tuiter's Message function.
 */

import mongoose, {Schema} from "mongoose";
import Message from "../models/Message";

/**
 * @const {Schema} MessageSchema is a schema which represents a Message
 * instance that is either sent or recieved by Users which are stored
 * in a MongoDB Atlas database.
 */

const MessageSchema = new mongoose.Schema<Message>({
    msg: {type: String, required: true},
    sentOn: Date,
    send: {type: Schema.Types.ObjectId, ref: "UserModel"},
    receive: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: "messages"});

export default MessageSchema;