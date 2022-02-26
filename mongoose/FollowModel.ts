/**
 * @file Serves as a Mongoose model representing a Follow.
 */

import mongoose from "mongoose";
import FollowSchema from "./FollowSchema";

/**
 * @const {model} LikeModel represents a Mongoose LikeModel to
 * be used for Atlas database storage and interaction.
 */

const FollowModel = mongoose.model("FollowModel", FollowSchema);
export default FollowModel;