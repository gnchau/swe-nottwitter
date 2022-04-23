/**
 * @file Implements a mongoose schema that defines the shape of
 * the document in the dislikes collection.
 */

import mongoose, {Schema} from "mongoose";
import Dislike from "../../models/dislikes/Dislike";

const DislikesSchema = new mongoose.Schema<Dislike>({
    tuit: {type: Schema.Types.ObjectId,
        ref: "TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId,
        ref: "UserModel"},
}, {collection: "dislikes"});
export default DislikesSchema;