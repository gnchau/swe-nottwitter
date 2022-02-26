import Like from "../models/Like";

export default interface ILikeDao {
    findAllUsersThatLikedTuit(tid: string): Promise<Like[]>;

    findAllTuitsLikedByUser(uid: string): Promise<Like[]>;

    userLikesTuit(tid: string, uid: string): Promise<Like>;

    userUnlikesTuit(tid: string, uid: string): Promise<any>;

    tuitDeleted(tid: string): Promise<any>;
};