import User from "./User";

/**
 * @typedef Follow Declares data type representing the Follow relationship between
 * two users as a directed connection in which one User follows a different one.
 * @property {User} follower the User who instantiated the follow to another
 * @property {User} following the User who is being followed by another
 */

export default interface Follow {
    follower: User,
    following: User
};