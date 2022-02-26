import {Request, Response} from "express";

export default interface IMessageController {
    send(req: Request, res: Response): void;

    delete(req: Request, res: Response): void;

    viewSent(req: Request, res: Response): void;

    viewReceived(req: Request, res: Response): void;
}