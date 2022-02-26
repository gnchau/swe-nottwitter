/**
 * @file A JS object representing a User's information in Tuiter.
 */

import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import Tuit from "./Tuit";

/**
 * @class User A class which represents a User's account on Tuiter.
 * @property {string} username represents a User's username on the account
 * @property {string} password represents a User's password on the account
 * @property {string} firstName represents a User's first name
 * @property {string} lastName represents a User's last name
 * @property {string} email represents a User's email addresss
 * @property {string} profilePhoto represents a User's link to their profile picture
 * @property {string} headerImage represents a User's link to their header image
 * @property {string} accountType represents a User's account type
 * @property {string} maritalStatus represents a User's marital status
 * @property {string} biography represents a User's biography to be displayed on Tuiter
 * @property {string} dateOfBirth represents a User's birth date
 * @property {string} joined represents a User's account creation date
 * @property {string} location represents a User's location
 * @property {Tuit[]} bookmarks represents a User's list of bookmarked Tuits
 *
 */

export default class User {
    private username: string = '';
    private password: string = '';
    private firstName: string | null = null;
    private lastName: string | null = null;
    private email: string = '';
    private profilePhoto: string | null = null;
    private headerImage: string | null = null;
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private biography: string | null = null;
    private dateOfBirth: Date | null = null;
    private joined: Date = new Date();
    private location: Location | null = null;

    private bookmarks: Tuit[] = [];
}