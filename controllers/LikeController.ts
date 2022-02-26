/**
 * @file A controller implementing the RESTful Web service API
 * for the Like functionality on Tuiter.
 */

import {Express, Request, Response} from "express";
import LikeDao from "../daos/LikeDao";
import ILikeController from "../interfaces/ILikeController";

/**
 * @class TuitController Implements RESTful Web service API for the Like
 * functionality on Tuiter.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes retrieves all the Tuits liked by a User
 *     </li>
 *     <li>GET /api/tuits/:tid/likes retrieves all the Users that liked a Tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid records an instance of a User liking a Tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid records an instance of a User unliking a Tuit
 *     </li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing CRUD operations for the
 * Like functionality on Tuiter
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */

export default class LikeController implements ILikeController {
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static likeController: LikeController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */

    public static getInstance = (app: Express): LikeController => {
        if (LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
            app.get("/api/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
            app.post("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
            app.delete("/api/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
        }
        return LikeController.likeController;
    }

    private constructor() {
    }

    /**
     * Retrieves all the Users that like a Tuit from the database
     * @param {Request} req Represents the request from a client that includes
     * the path which represents the Liked Tuit (tid)
     * @param {Response} res Represents response to client which includes
     * a JSON body containing the uids of the Users who liked the Tuit
     */
    findAllUsersThatLikedTuit = (req: Request, res: Response) =>
        LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));

    /**
     * Retrieves all the Tuits that a certain User liked in a database
     * @param {Request} req represents request from client which includes the
     * path which represents the User's id (uid) whose Liked Tuits we want to retrieve
     * @param {Response} res represents response to client which includes a
     * JSON body that contains all the Tuits a User has liked.
     */
    findAllTuitsLikedByUser = (req: Request, res: Response) =>
        LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
            .then(likes => res.json(likes));

    /**
     * @param {Request} req represents the request from a client which includes
     * path parameters representing the User (uid) who is Liking a Tuit (tid)
     * @param {Response} res represents the response to a client which includes
     * a JSON body that contains data regarding the new Liked status inserted into
     * the database with respect to a Tuit
     */
    userLikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then(likes => res.json(likes));

    /**
     * @param {Request} req represents a request from the client that includes
     * the path values which represent the User (uid) who is unliking a Tuit (tid)
     * @param {Response} res represents the response to the client which includes
     * a status representing whether or not the Like deletion request was successful
     */
    userUnlikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
}