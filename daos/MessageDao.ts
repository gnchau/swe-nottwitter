/**
 * @file Data Access Object which allows the Message object to interact with the database.
 * Uses mongoose MessageModel to integrate with MongoDB
 */

import IMessageDao from "../interfaces/IMessageDao";
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";

/**
 * @class MessageDao represents the Message Data Access Object which connects Message objects
 * to the database and allows for interaction
 * @property {MessageDao} messageDao Singleton DAO implementing Message CRUD operations
 */
export default class MessageDao implements IMessageDao {
    private static messageDao: MessageDao | null = null;

    /**
     * Create singleton DAO instance
     * @return MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    /**
     * Deletes a Message from the database based on its id
     *
     * @param {string} msgid a Message's primary key
     * @return {Promise<any>}
     * @memberof MessageDao
     */
    async delete(msgid: string): Promise<any> {
        return MessageModel.deleteOne({_id: msgid});
    }

    /**
     * Creates a message instance in database.
     *
     * @param {string} sendid represents a User who is sending the Message
     * @param {string} receiveid represents a User who is recieving the Message
     * @param {Message} msg represents the message contents
     * @return {Promise<Message>}
     * @memberof MessageDao
     */
    async send(sendid: string, receiveid: string, msg: Message): Promise<Message> {
        return MessageModel.create({...msg, send: sendid, receive: receiveid});
    }


    /**
     * Retrieves all Messages that have been recieved by a specified User
     *
     * @param {string} uid represents the specified User's primary key
     * @return {Promise<Message[]>}
     * @memberof MessageDao
     */
    async viewReceived(uid: string): Promise<Message[]> {
        return MessageModel.find({receive: uid});
    }

    /**
     * Retrieves all Messages that have been sent by a specified User
     *
     * @param {string} uid represents the specified User's primary key
     * @return {Promise<Message[]>}
     * @memberof MessageDao
     */
    async viewSent(uid: string): Promise<Message[]> {
        return MessageModel.find({send: uid});
    }

}