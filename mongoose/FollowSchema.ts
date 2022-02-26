/**
 * @file Serves as a Mongoose Schema for Tuiter's Follow function.
 */

import mongoose, {Schema} from "mongoose";
import Follow from "../models/Follow";

/**
 * @const {Schema} FollowSchema is the schema which represents the follow relationship
 * between two User instances stored in a MongoDB database.
 */

const FollowSchema = new mongoose.Schema<Follow>({
    follower: {type: Schema.Types.ObjectId, ref: "UserModel"},
    following: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: "follows"});

export default FollowSchema;