/**
 * @file A Tuit object in Tuiter.
 */

import User from "./User";

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
    private postedBy: User | null = null;
}