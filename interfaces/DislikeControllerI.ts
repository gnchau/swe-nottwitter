/**
 * @file define the Controller interface for RESTful Web service API for dislikes resource
 */

import {Request, Response} from "express";

export default interface DislikeControllerI {
    findAllUsersThatDislikedTuit (req: Request, res: Response): void;
    findAllTuitsDislikedByUser (req: Request, res: Response): void;
    userTogglesTuitDislikes (req: Request, res: Response): void;
};