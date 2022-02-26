/**
 * @file Serves as a Mongoose Schema for a Tuiter User.
 */

import mongoose, {Schema} from "mongoose";
import User from "../models/User";

/**
 * @const {Schema} UserSchema is a schema which represents
 * a User instance stored in a MongoDB Atlas database.
 */

const UserSchema = new mongoose.Schema<User>(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        firstName: String,
        lastName: String,
        email: String,
        profilePhoto: String,
        headerImage: String,
        accountType: {
            type: String,
            default: 'PERSONAL',
            enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']
        },
        maritalStatus: {
            type: String,
            default: 'SINGLE',
            enum: ['MARRIED', 'SINGLE', 'WIDOWED']
        },
        biography: String,
        dateOfBirth: Date,
        joined: {
            type: Date,
            default: Date.now
        },
        bookmarks: [{type: Schema.Types.ObjectId, ref: "TuitModel"}],
        location: {
            latitude: {
                type: Number, default: 0.0
            },
            longitude: {
                type: Number, default: 0.0
            },
        }
    },
    {collection: 'users'}
);
export default UserSchema;