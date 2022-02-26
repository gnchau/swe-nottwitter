/**
 * @file Serves as a Mongoose model representing a Tuit.
 */

import mongoose from "mongoose";
import TuitSchema from "./TuitSchema";

/**
 * @const {model} TuitModel represents a Mongoose TuitModel to
 * be used for Atlas database storage and interaction.
 */

const TuitModel = mongoose.model("TuitModel", TuitSchema);
export default TuitModel;