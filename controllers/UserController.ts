/**
 * @file A controller implementing the RESTful Web service API
 * for Users on Tuiter.
 */

import UserDao from "../daos/UserDao";
import User from "../models/User";
import {Express, Request, Response} from "express";
import IUserController from "../interfaces/UserController";

/**
 * @class UserController implements RESTful Web Service API for the User functionality
 * in Tuiter
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users creates a new User instance
 *     /li>
 *     <li>GET /api/users retrieves all the existing User instances in a database
 *     </li>
 *     <li>GET /api/users/:uid retrieves an individual User instance in a database
 *     </li>
 *     <li>PUT /api/users/:uid used to to modify a specified User instance
 *     </li>
 *     <li>DELETE /api/users/:uid removes a specified User instance
 *     </li>
 *     </li>
 *     <li>DELETE /api/users removes all user instances from the database
 *     </li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
 * @property {UserController} userController Singleton controller implementing
 */
export default class UserController implements IUserController {
    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;

    /**
     * Create Singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web Service API
     * @return UserController
     */
    public static getInstance = (app: Express): UserController => {
        if (UserController.userController === null) {
            UserController.userController = new UserController();
            app.get("/api/users", UserController.userController.findAllUsers);
            app.get("/api/users/:uid", UserController.userController.findUserById);
            app.post("/api/users", UserController.userController.createUser);
            app.put("/api/users/:uid", UserController.userController.updateUser);
            app.delete("/api/users/:uid", UserController.userController.deleteUser);
            app.delete("/api/users", UserController.userController.deleteAllUsers);

            app.post('/api/login', UserController.userController.login);
            app.get("/api/users/username/:username/delete",
                UserController.userController.deleteUsersByUsername);
            app.get("/api/users/username/:username/get",
                UserController.userController.findUserByUsername);

        }
        return UserController.userController;
    }

    private constructor() {
    }

    /**
     * Retrieves all the User instances from the database and returns an
     * array of Users (User[])
     * @param {Request} req represents the request from a client to return
     * all the Users in the databsse
     * @param {Response} res Response to client that includes a JSON array
     * which contains the User objects
     */
    findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers()
            .then((users: User[]) => res.json(users));

    /**
     * Retrieves a User which has been specified by their unique key (uid)
     * @param {Request} req  represents the request from a client that includes
     * a parameter which represents the key of a User (uid) to be retrieved from the database
     * @param {Response} res represents the response to a client that includes a JSON body
     * that contains the User's information whose key matches the specified uid
     */
    findUserById = (req: Request, res: Response) =>
        UserController.userDao.findUserById(req.params.uid)
            .then((user: User) => res.json(user));

    /**
     * Creates a new User instance for insertion in the database
     * @param {Request} req represents the request from a client that includes a JSON body
     * which contains the information for a new User to be inserted into the database
     * @param {Response} res represents the response to a client which includes a JSON
     * body that contains the new User who has been inserted into the database
     */
    createUser = (req: Request, res: Response) =>
        UserController.userDao.createUser(req.body)
            .then((user: User) => res.json(user));

    /**
     * Modifies an existing user instance
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a user was successful or not
     */
    updateUser = (req: Request, res: Response) =>
        UserController.userDao.updateUser(req.params.uid, req.body)
            .then((status) => res.send(status));

    /**
     * Removes am existing User instance in the database
     * @param {Request} req represents the request from a client that includes
     * a specific User's key (uid) who is going to be removed from the database
     * @param {Response} res represents the response to a client which indicates
     * whether or not the User has been successfully deleted from the database
     */
    deleteUser = (req: Request, res: Response) =>
        UserController.userDao.deleteUser(req.params.uid)
            .then((status) => res.send(status));

    /**
     * Removes all user instances from the database. Useful for testing
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including status
     * on whether deleting all users was successful or not
     */
    deleteAllUsers = (req: Request, res: Response) =>
        UserController.userDao.deleteAllUsers()
            .then((status) => res.send(status));

    /**
     * Removes Users given their username
     * @param req request from client that contains the Username
     * @param res response to client that indicates the status of deletion
     */
    deleteUsersByUsername = (req: Request, res: Response) =>
        UserController.userDao.deleteUsersByUsername(req.params.username)
            .then((status: any) => res.send(status));


    /**
     * Authorizes the User
     * @param req request from client that contains username and password
     * @param res response to client that contains the User's login information
     */
    login = (req: Request, res: Response) =>
        UserController.userDao.findUserByCredentials(req.body.username, req.body.password)
            .then(user => {res.json(user)});

    /**
     * Register the User.
     * @param req request from client that contains registration information
     * @param res response to client that indicates if a User exists
     * bue does not create a new User
     */
    register = (req: Request, res: Response) =>
        UserController.userDao.findUserByUsername(req.body.username)
            .then(user => {

            })

    /**
     * Retrieves the User by their username
     * @param {Request} req request from client that includes params that
     * contains a User's username
     * @param {Response} res response to client that includes the
     * body formatted as JSON containing the User with the given username
     */
    findUserByUsername = (req: Request, res: Response) =>
        UserController.userDao.findUserByUsername(req.params.username)
            .then((user: User) => res.json(user));
};
