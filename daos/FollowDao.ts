/**
 * @file Data Access Object for the Follow relationship to interact with database.
 * Uses mongoose FollowModel to integrate with MongoDB
 */

import IFollowDao from "../interfaces/IFollowDao";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";

/**
 * @class Follow represents the Follow Data Access Object which connects Follow objects
 * to the database and allows for interaction
 * @property {FollowDao} followDao Singleton DAO implementing Follow CRUD operations
 */
export default class FollowDao implements IFollowDao {
    private static followDao: FollowDao | null = null;

    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    /**
     * Create singleton DAO instance
     * @return FollowDao
     */
    private constructor() {
    }

    /**
     * Creates a Follow relationship between two Users
     *
     * @param {string} followerid represents the follower User's primary key
     * @param {string} followingid represents the following User's primary key
     * @memberof FollowDao
     */
    follow = async (followerid: string, followingid: string): Promise<Follow> =>
        FollowModel.create({follower: followerid, following: followingid});

    /**
     * Removes a Follow relationship between two Users
     *
     * @param {string} followerid represents the unfollower User's primary key
     * @param {string} followingid represents the unfollowing User's primary key
     * @memberof FollowDao
     */
    unfollow = async (followerid: string, followingid: string): Promise<any> =>
        FollowModel.deleteOne({follower: followerid, following: followingid});

    /**
     * Retrieves the following list of a specified User
     *
     * @param {string} uid represents the specified User's primary key
     * @memberof FollowDao
     */
    userFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({follower: uid}).populate("following").exec();

    /**
     * Retrieves a User's list of followers
     *
     * @param {string} uid represents the specified User's primary key
     * @memberof FollowDao
     */
    viewFollowers = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({following: uid}).populate("follower").exec();

}