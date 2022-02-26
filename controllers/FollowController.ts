/**
 * @file A controller implementing the RESTful Web service API
 * for the Follow functionality on Tuiter.
 */

import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import IFollowController from "../interfaces/IFollowController";

/**
 * @class FollowController Implements a RESTful Web service API for
 * the Follow functionality on Tuiter.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/follows used to retrieve the list of Users that
 *     are followed by a User
 *     </li>
 *     <li>GET /api/users/:uid/follows/fans used to retrieve the list of Users who
 *     follow a User
 *     </li>
 *     <li>POST /api/users/:uid/follows/:followingid used to record a User following another User
 *     </li>
 *     <li>DELETE /api/users/:uid/follows/:followingid used to record when a User is
 *     no longer following another User</li>
 * </ul>
 * @property {FollowDao} followDao a Singleton DAO implementing CRUD operations for a Follow
 * @property {FollowController} followController a Singleton controller implementing a
 * RESTful Web service API for the Follow functionality
 */

export default class FollowController implements IFollowController {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates a Singleton controller instance
     * @param {Express} app an Express instance that declares a RESTful Web service
     * API
     * @return FollowController
     */

    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uid/follows/:followingid", FollowController.followController.follow);
            app.delete("/api/users/:uid/follows/:followingid", FollowController.followController.unfollow);
            app.get("/api/users/:uid/follows", FollowController.followController.userFollowing);
            app.get("/api/users/:uid/follows/fans", FollowController.followController.viewFollowers);
        }
        return FollowController.followController;
    }

    private constructor() {
    }

    /**
     * Used to create a Follow relationship between two Users
     *
     * @param {Request} req represents the request from a client that includes
     * the path parameters uid (the User id) and followingid (representing the Follower's id)
     * of another User following a User
     * @param {Response} res represents the response to a client that includes
     * a JSON body that indicates whether the new Follower was successsfully inserted into the
     * database or not
     * @memberof BookmarkController
     */
    follow = (req: Request, res: Response) =>
        FollowController.followDao.follow(req.params.uid, req.params.followingid)
            .then(follows => res.json(follows));

    /**
     * Used to delete a Follow relationship between two Users
     *
     * @param {Request} req Represents request from client that includes the
     * path parameters uid and followingid representing a User (uid) that is unfollowing
     * another User (fid)
     * @param {Response} res Represents response to client that includes the status
     * on whether deleting the follow was successful or not
     * @memberof FollowController
     */
    unfollow = (req: Request, res: Response) =>
        FollowController.followDao.unfollow(req.params.uid, req.params.followingid)
            .then(status => res.json(status));

    /**
     * Used to retrieve the list of Users that are Followed by another User
     *
     * @param {Request} req represents the request from a client that includes the path
     * parameter uid representing the User whose list of Following is to be retrieved
     * @param {Response} res represents the response to a client that includes a JSON body
     * that contains information regarding User objects that are followed by a User
     * @memberof FollowController
     */
    userFollowing = (req: Request, res: Response) =>
        FollowController.followDao.userFollowing(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Used to retrieve the list of Users that Follow a User
     *
     * @param {Request} req represents the request from a client that includes the path
     * parameter uid representing the User whose Followers to be retrieved
     * @param {Response} res represents the response to a client that includes a JSON body
     * that contains information regarding User objects that follow a User
     * @memberof FollowController
     */
    viewFollowers = (req: Request, res: Response) =>
        FollowController.followDao.viewFollowers(req.params.uid)
            .then(follows => res.json(follows));
}