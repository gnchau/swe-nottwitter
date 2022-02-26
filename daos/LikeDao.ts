/**
 * @file Data Access Object for Like relationship to interact with database. Uses mongoose LikeModel
 * to integrate with MongoDB
 */

import ILikeDao from "../interfaces/ILikeDao";
import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";

/**
 * @class LikeDao represents the Like Data Access Object which is used to connect
 * the object with database actions.
 * @property {LikeDao} likeDao Singleton DAO implementing Like CRUD operations
 */
export default class LikeDao implements ILikeDao {
    private static likeDao: LikeDao | null = null;

    /**
     * Create singleton DAO instance
     * @return LikeDao
     */
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {
    }

    /**
     * Retrieves all the Users who liked a specified Tuit
     *
     * @param {string} tid represents a Tuit's primary key
     * @memberof LikeDao
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Retrieves all the Tuits that a specified User has Liked
     *
     * @param {string} uid represents a User's primary key
     * @memberof LikeDao
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * Creates a Like relationship between a Tuit and a User
     *
     * @param {string} uid represents a User's primary id
     * @param {string} tid represents a Tuit's primary id
     * @memberof LikeDao
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Deletes a Like relationship between a User and a Tuit
     *
     * @param {string} uid represents a User's primary id
     * @param {string} tid represents a Tuit's primary id
     * @memberof LikeDao
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});

    /**
     * Removes all Like relationships containing the deleted Tuit.
     *
     * @param {string} tid Tuit id
     */
    tuitDeleted = async (tid: string): Promise<any> =>
        LikeModel.deleteMany({tuit: tid});
}