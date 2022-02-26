/**
 * @file Data Access Object for a Bookmark to interact with database. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */


import IBookmarkDao from "../interfaces/IBookmarkDao";
import UserModel from "../mongoose/UserModel";

/**
 * @class BookmarkDao represents the Bookmark Data Access Object which is used to connect
 * the object with the database actions.
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing Bookmark CRUD operations
 */
export default class BookmarkDao implements IBookmarkDao {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Create singleton DAO instance
     * @return BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {
    }

    /**
     * Adds a Tuit to User's list of Bookmarked Tuits
     *
     * @param {string} uid represents a User's primary key
     * @param {string} tid represents the to-be Bookmarked Tuit's primary key
     * @return {Promise<any>}
     * @memberof BookmarkDao
     */
    async bookmarks(uid: string, tid: string): Promise<any> {
        return UserModel.updateOne(
            {_id: uid},
            {
                $push: {
                    bookmarks: tid
                }
            }
        ).exec();
    }

    /**
     * Removes a Tuit from a User's list of Bookmarked Tuits
     *
     * @param {string} uid represents a User's primary key
     * @param {string} tid represents the to-be removed-from-Bookmarks
     * Tuit's primary key
     * @return {Promise<any>}
     * @memberof BookmarkDao
     */
    async unBookmark(uid: string, tid: string): Promise<any> {
        return UserModel.updateOne(
            {_id: uid},
            {
                $pull: {
                    bookmarks: tid
                }
            }
        );
    }

    /**
     * Retrieves a list of Bookmarked Tuits from a specified User
     *
     * @param {string} uid represents a User's primary key
     * @return {Promise<any>}
     * @memberof BookmarkDao
     */
    async viewBookmarks(uid: string): Promise<any> {
        return UserModel.findById(uid)
            .populate("bookmarks")
            .select('bookmarks')
            .exec();
    }
}