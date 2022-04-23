/**
 * @file Declares Tuit data type representing a tuit
 */

import User from "../users/User";
import Stats from "./Stats";

/**
 * @typedef Tuit Represents tuit posted by a users
 * @property {String} tuit Content of the tuit
 * @property {User} postedBy User that posted the Tuit
 * @property {Date} postedOn date in which the tuit was posted
 * @property {Stats} stats statistics regarding number of likes, dislikes, replies, and reTuits that a Tuit recieves
 */
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    image?: String,
    youtube?: String,
    avatarLogo?: String,
    imageOverlay?: String,
    stats: Stats
};