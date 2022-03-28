/**
 * @file A Tuit object in Tuiter.
 */

import User from "./User";
import Stats from "./Stats";

/**
 * @class Tuit A data type which represents
 * a Tuit that is been posted by a User and can
 * be interacted with within Tuiter.
 * @property {string} tuit represents the contents of a tuit
 * @property {Date} postedOn represents the date on which a Tuit is posted
 * @property {User} postBy represents who posted the Tuit originally
 */

export default class Tuit {
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postBy: User | null = null;
    private image: string | null = null;
    private youtube: string | null = null;
    private avatarLogo: string | null = null;
    private imageOverlay: string | null = null;
    private stats: Stats | null = null;
}