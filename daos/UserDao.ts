/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */

import UserModel from "../mongoose/UserModel";
import User from "../models/User";
import IUserDao from "../interfaces/IUserDao";
import TuitDao from "./TuitDao";

/**
 * @class UserDao represents the User Data Access Object which connects User objects
 * to the database and allows for interaction
 * @property {UserDao} userDao Singleton DAO implementing User CRUD operations
 */
export default class UserDao implements IUserDao {
    private static userDao: UserDao | null = null;

    /**
     * Create singleton DAO instance
     * @return UserDao
     */
    public static getInstance = (): UserDao => {
        if (UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }

    private constructor() {
    }

    /**
     * retrieve all user instances.
     *
     * @return {Promise<User[]>}
     * @memberof UserDao
     */
    findAllUsers = async (): Promise<User[]> =>
        UserModel.find().exec();

    /**
     * Uses UserModel to retrieve single user document from users collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    findUserById = async (uid: string): Promise<any> =>
        UserModel.findById(uid);


    /**
     * Inserts user instance into the database
     * @param {User} user Instance to be inserted into the database
     * @returns Promise To be notified when user is inserted into the database
     */
    createUser = async (user: User): Promise<User> =>
        UserModel.create(user);


    /**
     * Updates user with new values in database
     * @param {string} uid Primary key of user to be modified
     * @param {User} user User object containing properties and their new values
     * @returns Promise To be notified when user is updated in the database
     */
    updateUser = async (uid: string, user: User): Promise<any> =>
        UserModel.updateOne(
            {_id: uid},
            {$set: user});

    /**
     * Removes user from the database.
     * @param {string} uid Primary key of user to be removed
     * @returns Promise To be notified when user is removed from the database
     */
    deleteUser = async (uid: string): Promise<any> =>
        UserModel.deleteOne({_id: uid});

    /**
     * Delete a User given their username
     *
     * @param username the User's username
     * @return {Promise<any>}
     */
    deleteUsersByUsername = async (username: string): Promise<any> =>
        UserModel.deleteMany({username});

    /**
     * Removes all users from the database. Useful for testing
     * @returns Promise To be notified when all users are removed from the
     * database
     */
    deleteAllUsers = async (): Promise<any> =>
        UserModel.deleteMany({});
    /**
     * Find a User givin their login credentials.
     *
     * @param username the username of the user
     * @param password the password of the user
     * @return {Promise<any>}
     * @memberOf UserDao
     */
    findUserByCredentials = async (username: string, password: string): Promise<any> =>
        UserModel.findOne({username: username, password: password});

    /**
     * Find a User by their username.
     *
     * @param username a string representing the user's username
     * @return {Promise<any>}
     */
    findUserByUsername = async (username: string): Promise<any> =>
        UserModel.findOne({username});

    /**
     * Adjusts a User's salary.
     *
     * @param username a string representing the User's username
     * @param salary a number representing a User's salary
     * @return {Promise<any>}
     */
    updateUserSalaryByUsername = async (username: string, salary: number): Promise<any> =>
        UserModel.updateOne(
            {username},
            {$set: {salary: salary}});


}