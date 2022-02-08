import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import ITuitDao from "../interfaces/ITuitDao";

export default class TuitDao implements ITuitDao {
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    };

    private constructor() {
    }

    async findAllTuits(): Promise<Tuit[]> {
        return TuitModel.find();
    }

    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return TuitModel.find({postedBy: uid});
    }

    async findTuitById(uid: string): Promise<any> {
        return await TuitModel.findById(uid).populate("postedBy").exec();
    }

    async createTuit(uid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.create({...tuit, postedBy: uid});
    }

    async deleteTuit(uid: string): Promise<any> {
        return TuitModel.deleteOne({postedBy: uid});
    }

    async updateTuit(uid: string, tuit: Tuit): Promise<any> {
        return TuitModel.updateOne({postedBy: uid}, {$set: tuit});
    }
}