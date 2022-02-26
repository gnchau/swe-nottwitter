/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */

import UserModel from "../mongoose/UserModel";
import User from "../models/User";
import IUserDao from "../interfaces/IUserDao";

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
    async findAllUsers(): Promise<User[]> {
        return UserModel.find();
    }

    /**
     * Uses UserModel to retrieve single user document from users collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    async findUserById(uid: string): Promise<any> {
        return UserModel.findById(uid);
    }


    /**
     * Inserts user instance into the database
     * @param {User} user Instance to be inserted into the database
     * @returns Promise To be notified when user is inserted into the database
     */
    async createUser(user: User): Promise<User> {
        return await UserModel.create(user);
    }

    /**
     * Updates user with new values in database
     * @param {string} uid Primary key of user to be modified
     * @param {User} user User object containing properties and their new values
     * @returns Promise To be notified when user is updated in the database
     */
    async updateUser(uid: string, user: User): Promise<any> {
        return UserModel.updateOne(
            {_id: uid},
            {$set: user});
    }

    /**
     * Removes user from the database.
     * @param {string} uid Primary key of user to be removed
     * @returns Promise To be notified when user is removed from the database
     */
    async deleteUser(uid: string): Promise<any> {
        return UserModel.deleteOne({_id: uid});
    };

    /**
     * Removes all users from the database. Useful for testing
     * @returns Promise To be notified when all users are removed from the
     * database
     */
    deleteAllUsers = async (): Promise<any> =>
        UserModel.deleteMany({});

}