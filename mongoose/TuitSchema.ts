/**
 * @file Serves as a Mongoose Schema for Tuiter's Tuit function.
 */

import mongoose, {Schema} from "mongoose";
import Tuit from "../models/Tuit";

/**
 * @const {Schema} TuitSchema is a Mongoose schema which represents
 * a Tuit instance that is stored in a MongoDB Atlas database.
 */

const TuitSchema = new mongoose.Schema<Tuit>(
    {
        tuit: {
            type: String,
            required: true
        },
        postedOn: {
            type: Date,
            default: Date.now
        },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },
    },
    {
        collection: "tuits"
    }
);
export default TuitSchema;