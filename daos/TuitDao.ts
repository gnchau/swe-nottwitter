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
     findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
         TuitModel.find({postedBy: uid})
             .populate("postedBy")
             .exec();

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
     findTuitById = async (uid: string): Promise<any> =>
         TuitModel.findById(uid)
             .populate("postedBy")
             .exec();

    /**
     * Creates a Tuit instance for insertion into the database
     *
     * @param {string} uid represents the primary key of the User who created a Tuit
     * @param {Tuit} tuit represenss the Tuit object that has been created.
     * @returns {Promise<Tuit>}
     */
     createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
         TuitModel.create({...tuit, postedBy: uid});
    /**
     * Deletes a Tuit instance from the database.
     *
     * @param {string} tid represents the to-be-deleted Tuit's primary key.
     * @return {Promise<any>}
     * @memberof TuitDao
     */
     deleteTuit = async (uid: string): Promise<any> =>
         TuitModel.deleteOne({_id: uid});

    /**
     * Modifies a preexisting Tuit's contents
     *
     * @param {string} tid represents the primary key of the to-be-modified Tuit
     * @param {Tuit} tuit an updated Tuit that is to replace the original Tuit
     * @return {Promise<any>}
     * @memberof TuitDao
     */
     updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
         TuitModel.updateOne(
             {_id: uid},
             {$set: tuit});

    /**
     * Delete all tuits post by a user
     * @param uid represents the primary key of the User whose Tuits will be deleted
     */
    async deleteTuitsByUser(uid: string): Promise<any> {
        return TuitModel.deleteMany({postBy: uid});
    }
}
