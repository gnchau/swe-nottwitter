/**
 * @file A controller implementing the RESTful Web service API
 * for the Bookmark functionality on Tuiter.
 */

import {Express, Request, Response} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import IBookmarkController from "../interfaces/IBookmarkController";

/**
 * @class BookmarkController Implements a RESTful Web service API for
 * the Bookmark functionality on Tuiter.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>PUT /api/users/:uid/bookmarks/:tid to record an instance of a User bookmarking a Tuit
 *     </li>
 *     <li>PUT /api/users/:uid/bookmarks/remove/:tid to record an instance of a User
 *     removing a Bookmark on a Tuit</li>
 *     <li>GET /api/users/:uid/bookmarks used to retrieve a User's list of
 *     Bookmarked Tuits
 *     </li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao a Singleton DAO implementing CRUD operations for a Bookmark
 * @property {BookmarkController} bookmarkController a Singleton controller implementing a
 * RESTful Web service API for the Bookmark functionality
 */

export default class BookmarkController implements IBookmarkController {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    /**
     * Creates a Singleton controller instance
     * @param {Express} app an Express instance that declares a RESTful Web service
     * API
     * @return BookmarkController
     */

    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.put("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.bookmarks);
            app.put("/api/users/:uid/bookmarks/remove/:tid", BookmarkController.bookmarkController.unBookmark);
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.viewBookmarks);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {
    }

    /**
     * Adds a Tuit to a User's list of Bookmarked Tuits
     *
     * @param {Request} req represents the request from a client that includes
     * the path parameters uid (the User id) and tid (representing the Tuit id)
     * of the User bookmarking a Tuit
     * @param {Response} res represents the response to a client that includes
     * the status regarding whether adding Tuit to Bookmarks was successful or not
     * @memberof BookmarkController
     */
    bookmarks = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.bookmarks(req.params.uid, req.params.tid)
            .then(status => res.json(status));
    /**
     * Removes a Tuit from a User's list of Bookmarked Tuits
     *
     * @param {Request} req represents the request from a client that includes
     * the path parameters uid (the User id) and tid (representing the Tuit id)
     * which represent the User that is unbookmarking a Tuit
     * @param {Response} res represents the response to a client that includes a
     * status regarding whether or not a Tuit from the User's Bookmarked Tuits was
     * successful or not
     * @memberof BookmarkController
     */
    unBookmark = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.unBookmark(req.params.uid, req.params.tid)
            .then(status => res.json(status));

    /**
     * Lets a client view a User's list of Bookmarked Tuits
     *
     * @param {Request} req represents the request from a client that includes
     * the path parameter uid (the User id) which represents the User whose
     * Tuits are to be viewed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects which are
     * bookmarked by the user
     * @memberof BookmarkController
     */
    viewBookmarks = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.viewBookmarks(req.params.uid)
            .then(user => res.json(user));

}