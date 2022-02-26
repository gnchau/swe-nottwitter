/**
 * @file A Message object that represents a message sent by one user to another over Tuiter.
 */

import User from "./User";

/**
 * @class Message A data type that represents a message
 * that can be either sent or received by Users on Tuiter.
 * @property {string} msg represents the message's contents
 * @property {Date} sentOn represents the date on which a message was sent
 * @property {User} send represents the User who sent the message
 * @property {User} receive represents the User who recieved the message
 */
export default class Message {
    private msg: string = '';
    private sentOn: Date = new Date();
    private sender: User | null = null;
    private receiver: User | null = null;
}