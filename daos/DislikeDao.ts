/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */

import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/dislikes/DislikeModel";
import Dislike from "../models/dislikes/Dislike";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    private constructor() {}

    /**
     * Retrieves all User documents that dislikes a particular tuit from the database.
     * @param {string} tid represents the primary key of the disliked tuit
     * @returns Promise To be notified when the users are retrieved from the database
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();

    /**
     * Retrieves all Tuit documents that are disliked by a particular user from the database.
     * @param {string} uid represents the primary key of the User who disliked the tuit
     * @returns Promise To be notified when the tuits are retrieved from the database
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    /**
     * Adds Dislike instance to the database.
     * @param {string} uid represents the primary key of the User who disliked the tuit
     * @param {string} tid represents the primary key of the Tuit to be disliked.
     * @returns Promise To be notified when the tuit is disliked by the user
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});


    /**
     * Retrieves a User documents that dislikes a particular tuit from the database.
     * @param {string} tid represents the primary key of the disliked tuit
     * @returns Promise To be notified when the user is retrieved from the database
     */
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});

    /**
     * Removes Dislike from the database.
     * @param {string} uid represents the primary key of the User who un-disliked the tuit
     * @param {string} tid represents the primary key of the Tuit to be undisliked.
     * @returns Promise To be notified when the tuit is undisliked by the user.
     */
    userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

    /**
     * Counts how many users disliked a Tuit.
     * @param {string} tid represents the primary key of Tuit.
     * @returns Promise To be notified when the number of users that dislikes a tuit is retrieved.
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});
}