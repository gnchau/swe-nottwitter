import Tuit from "../models/Tuit";

export default interface BookmarkDaoI {
    bookmarks(uid: string, tid: string): Promise<any>;

    unBookmark(uid: string, tid: string): Promise<any>;

    viewBookmarks(uid: string): Promise<any>;
}