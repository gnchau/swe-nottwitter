/**
 * @file A controller implementing the RESTful Web service API
 * for the Tuit functionality on Tuiter.
 */

import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import ITuitController from "../interfaces/TuitController";
import Tuit from "../models/Tuit";

/**
 * @class TuitController Implements RESTful Web service API for the Tuit
 * fuctionality on Tuiter.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/tuits creates a new Tuit object from a given User
 *     </li>
 *     <li>GET /api/tuits retrieves all the Tuit instances
 *     </li>
 *     <li>GET /api/tuits/:tid retrieves a single Tuit instance for a given User
 *     </li>
 *     <li>GET /api/users/:uid/tuits retrieves all the Tuit objects from a given User
 *     </li>
 *     <li>PUT /api/tuits/:tid used to modify a single Tuit's contents
 *     </li>
 *     <li>DELETE /api/tuits/:tid removes a single Tuit object from the database
 *     </li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing Tuit CRUD operations
 * @property {LikeDao} likeDao Singleton DAO implementing Like CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing
 */
export default class TuitController implements ITuitController {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): TuitController => {
        if (TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.get('/api/tuits', TuitController.tuitController.findAllTuits);
            app.get('/api/tuits/:tid', TuitController.tuitController.findTuitById);
            app.get('/api/users/:uid/tuits', TuitController.tuitController.findTuitsByUser)
            app.post('/api/users/:uid/tuits', TuitController.tuitController.createTuit);
            app.delete('/api/tuits/:tid', TuitController.tuitController.deleteTuit);
            app.put('/api/tuits/:tid', TuitController.tuitController.updateTuit);
        }
        return TuitController.tuitController;
    }

    private constructor() {
    }

    /**
     * Retrieves all the Tuits from the database and returns an array of Tuits (Tuit[]).
     * @param {Request} req represents the request to get all the Tuits from a database
     * @param {Response} res Represents response to client that includes a JSON
     * body that contians all the Tuit objects that have been retrieved from the
     * database
     */
    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then((tuits: Tuit[]) => res.json(tuits));

    /**
     * @param {Request} req represents a request from a client that includes
     * a parameter which represents the key of the Tuit (tid) to be retrieved
     * @param {Response} res Represents response to client that includes a JSON
     * body which contains the Tuit that matches the Tuit'd key (tid) or
     * nothing if no such Tuit with the given key exists in the database.
     */
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.tid)
            .then((tuit: Tuit) => res.json(tuit));

    /**
     * Retrieves all the Tuits by a certain ?USer from the database and returns an
     * array of Tuits (Tuit[]).
     * @param {Request} req represents the request to get the specified User's
     * Tuits from a database
     * @param {Response} res Represents response to client that includes a JSON
     * body that contains all the Tuit objects that have been retrieved from the
     * database that match the User's key (uid) provided
     */
    findTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitsByUser(req.params.uid)
            .then(tuits => res.json(tuits));

    /**
     * @param {Request} req represents a request from a client which includes a path
     * parameter that represents the key of the Tuit to be modified (tid) as well as a body
     * which represents the contents of the Tuit that replace the old contents
     * @param {Response} res represents a response to a client which includes a status which
     * indicates whether or not a Tuit has been successfully modified or not
     */
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));

    /**
     * @param {Request} req represents the request from a client that includes a
     * body that contains the JSON object for the new Tuit's contents for insertion
     * into the database
     * @param {Response} res represents the response to the client that includes
     * a JSON body that contains the new Tuit that has been inserted into the database
     * database
     */
    createTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuit(req.params.uid, req.body)
            .then((tuit: Tuit) => res.json(tuit));
    /**
     * @param {Request} req represents the request from a client that includes a
     * key (tid) that represents the Tuit to be deleted from the database
     * @param {Response} res represents the response to the client that includes
     * a status representing whether or not the Tuit has been successfully deleted
     */
    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.tid)
            .then(status => res.json(status));

}