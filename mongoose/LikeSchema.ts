/**
 * @file Serves as a Mongoose Schema for Tuiter's Like function.
 */

import mongoose, {Schema} from "mongoose";
import Like from "../models/Like";

/**
 * @const {Schema} FollowSchema is the schema which represents the Like relationship
 * between a Tuit and a User instance stored in a MongoDB database.
 */

const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: "likes"});

export default LikeSchema;