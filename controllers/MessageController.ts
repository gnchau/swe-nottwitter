/**
 * @file A controller implementing the RESTful Web service API
 * for the Message functionality on Tuiter.
 */

import IMessageController from "../interfaces/IMessageController";
import MessageDao from "../daos/MessageDao";
import {Express, Request, Response} from "express";


/**
 * @class MessageController Implements RESTful Web service API for the Message
 * functionality in Tuiter.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/messages retrieves the Messages that a User recieved
 *     </li>
 *     <li>GET /api/users/:uid/messages/sent retrieves all the Messages that a User has sent
 *     </li>
 *     <li>POST /api/users/:uid/messages/:receiveid creates a new Message instance between two users
 *     </li>
 *     <li>DELETE /api/messages/:msgid removes a single Message instance that occurs when two
 *     Users no longer follow one another
 *     </li>
 * </ul>
 *  * @property {MessageDao} messageDao Singleton DAO implementing CRUD operations for the Message
 *  functionality on Tuiter
 *  * @property {MessageController} messageController Singleton controller implementing
 *  * RESTful Web service API
 *  */

export default class MessageController implements IMessageController {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/api/users/:uid/messages", MessageController.messageController.viewReceived);
            app.get("/api/users/:uid/messages/sent", MessageController.messageController.viewSent);
            app.post("/api/users/:uid/messages/:receiveid", MessageController.messageController.send);
            app.delete("/api/messages/:msgid", MessageController.messageController.delete);
        }
        return MessageController.messageController;
    }

    private constructor() {
    }

    /**
     * @param {Request} req represents a request from the client, which includes a
     * JSON body that contains the object for the new Message that is to be inserted
     * in the database and a parameter which represents the User who sent the message (uid)
     * as well as a parameter that represents the User who recieves the message (recieveid)
     * @param {Response} res represents the response to a client, which includes a JSON
     * body that contains the new message inserted in the database
     * @memberof MessageController
     */
    send = (req: Request, res: Response) =>
        MessageController.messageDao.send(req.params.uid, req.params.receiveid, req.body)
            .then(msg => res.json(msg));

    /**
     * @param {Request} req represents the request from a client, which includes
     * a parameter representing the id of the message to be deleted (msgid)
     * @param {Response} res represents the response to the client, which indicates
     * whether or not a deletion request was successful
     * @memberof MessageController
     */
    delete = (req: Request, res: Response) =>
        MessageController.messageDao.delete(req.params.msgid)
            .then(status => res.json(status));

    /**
     * @param {Request} req represents the request from the client that includes the parameter
     * that represents the User (uid) whose incoming Messages are to be viewed
     * @param {Response} res represents the response to the client that includes a JSON body that
     * contains the Message objects that are the retrieved messages that a User has recieved from the database
     * @memberof MessageController
     */
    viewReceived = (req: Request, res: Response) =>
        MessageController.messageDao.viewReceived(req.params.uid)
            .then(msgs => res.json(msgs));


    /**
     * @param {Request} req represents the request from the client that includes the parameter
     * that represents the User (uid) whose outgoing Messages are to be viewed
     * @param {Response} res represents the response to the client that includes a JSON body that
     * contains the Message objects that are the sent messages that a User has recieved from the database
     * @memberof MessageController
     */
    viewSent = (req: Request, res: Response) =>
        MessageController.messageDao.viewSent(req.params.uid)
            .then(msgs => res.json(msgs));

}