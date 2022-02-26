/**
 * @file Serves as a Mongoose model representing a User.
 */

import mongoose from "mongoose";
import UserSchema from "./UserSchema";

/**
 * @const {model} UserModel represents a Mongoose UserModel to
 * be used for Atlas database storage and interaction.
 */

const UserModel = mongoose.model("UserModel", UserSchema);

export default UserModel;