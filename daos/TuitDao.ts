/**
 * @file Implements DAO managing data storage of users. Uses mongoose TuitModel
 * to integrate with MongoDB
 */

import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import ITuitDao from "../interfaces/ITuitDao";

/**
 * @class TuitDao represents the Tuit Data Access Object which is used to connect
 * the object with the database actions.
 * @property {TuitDao} tuitDao Singleton DAO implementing Tuit CRUD operations
 */
export default class TuitDao implements ITuitDao {
    private static tuitDao: TuitDao | null = null;

    /**
     * Create singleton DAO instance
     * @return TuitDao
     */
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    };

    private constructor() {
    }

    /**
     * Retrieve all preexinting Tuits.
     *
     * @return {Promise<Tuit[]>}
     * @memberof TuitDao
     */
    async findAllTuits(): Promise<Tuit[]> {
        return TuitModel.find();
    }

    /**
     * Retrieves all Tuits posted by a specified User.
     *
     * @param {string} uid represents the primary key of a specified User
     * @return {Promise<Tuit[]>}
     * @memberof TuitDao
     */
    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return TuitModel.find({postedBy: uid});
    }

    /**
     * Retrieves a specific Tuit.
     *
     * @param {string} tid represents the primary key of the Tuit to be searched for
     * @return {Promise<any>}
     * @memberof TuitDao
     */
    async findTuitById(tid: string): Promise<any> {
        return await TuitModel.findById(tid).populate("postedBy").exec();
    }

    /**
     * Creates a Tuit instance for insertion into the database
     *
     * @param {string} uid represents the primary key of the User who created a Tuit
     * @param {Tuit} tuit represenss the Tuit object that has been created.
     * @returns {Promise<Tuit>}
     */
    async createTuit(uid: string, tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create({...tuit, postedBy: uid});
    }

    /**
     * Deletes a Tuit instance from the database.
     *
     * @param {string} tid represents the to-be-deleted Tuit's primary key.
     * @return {Promise<any>}
     * @memberof TuitDao
     */
    async deleteTuit(tid: string): Promise<any> {
        return TuitModel.deleteOne({_id: tid});
    }

    /**
     * Modifies a preexisting Tuit's contents
     *
     * @param {string} tid represents the primary key of the to-be-modified Tuit
     * @param {Tuit} tuit an updated Tuit that is to replace the original Tuit
     * @return {Promise<any>}
     * @memberof TuitDao
     */
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return TuitModel.updateOne({_id: tid}, {$set: Tuit});
    }
}