/**
 * @file Declares Like data type representing relationship between
 * Users and Tuits, as in User dislikes a Tuit
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @typedef Dislike Represents dislike relationship between a User and a tuit,
 * as in a user dislikes a Tuit
 * @property {Tuit} tuit Tuit being disliked
 * @property {User} likedBy User disliking the Tuit
 */

export default interface Dislike {
    tuit: Tuit,
    dislikedBy: User
};