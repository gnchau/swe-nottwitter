/**
 * @file Serves as a Mongoose Schema for Tuiter's Tuit function.
 */
import mongoose, {Schema} from "mongoose";

/**
 * @const {Schema} TuitSchema is a Mongoose schema which represents
 * a Tuit instance that is stored in a MongoDB Atlas database.
 */
import Tuit from "../models/Tuit";
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now},
    image: String,
    youtube: String,
    avatarLogo: String,
    imageOverlay: String,
    stats: {
        replies: Number,
        retuits: Number,
        likes: Number
    }
}, {collection: "tuits"});
export default TuitSchema;