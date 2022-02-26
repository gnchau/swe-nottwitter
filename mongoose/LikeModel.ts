/**
 * @file Serves as a Mongoose model representing a Like.
 */

import mongoose from "mongoose";
import LikeSchema from "./LikeSchema";

/**
 * @const {model} LikeModel represents a Mongoose LikeModel to
 * be used for Atlas database storage and interaction.
 */


const LikeModel = mongoose.model("LikeModel", LikeSchema);
export default LikeModel;