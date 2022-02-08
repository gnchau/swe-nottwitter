import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import ITuitController from "../interfaces/TuitController";
import Tuit from "../models/Tuit";

export default class TuitController implements ITuitController {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;
    public static getInstance = (app: Express): TuitController => {
        if (TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.get("/api/hello", (req, res) => res.send("Tuiter Speaking"));
            app.get("/api/tuits", TuitController.tuitController.findAllTuits);
            app.get("/api/users/:uid/tuits", TuitController.tuitController.findTuitsByUser);
            app.get("/api/tuits/:uid", TuitController.tuitController.findTuitById);
            app.post("/api/users/:uid/tuits", TuitController.tuitController.createTuit);
            app.put("/api/tuits/:uid", TuitController.tuitController.updateTuit);
            app.delete("/api/tuits/:uid", TuitController.tuitController.deleteTuit);
        }
        return TuitController.tuitController;
    };

    private constructor() {
    }

    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits().then((tuits) => res.json(tuits));
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao
            .findTuitById(req.params.uid)
            .then((tuit: Tuit) => res.json(tuit));
    findTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao
            .findTuitsByUser(req.params.uid)
            .then((tuits: Tuit[]) => res.json(tuits));
    createTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuit(req.params.uid, req.body).then((tuit: Tuit) => res.json(tuit));
    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao
            .deleteTuit(req.params.uid)
            .then((status) => res.json(status));
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao
            .updateTuit(req.params.uid, req.body)
            .then((status) => res.json(status));
}