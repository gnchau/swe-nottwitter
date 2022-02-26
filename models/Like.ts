import Tuit from "./Tuit";
import User from "./User";

/**
 * @file Declares data type representing the Like relationship between
 * Users and Tuits: User likes a Tuit
 */


export default interface Like {

    /**
     * @typedef Like Represents the Like relationship between a
     * User and a Tuit: a User likes a Tuit
     * @property {Tuit} tuit represents the Tuit being liked
     * @property {User} likedBy represents the User liking the tuit
     */

    tuit: Tuit;
    likedBy: User;
};