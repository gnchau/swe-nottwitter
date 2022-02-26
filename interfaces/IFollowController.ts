import {Request, Response} from "express";

export default interface FollowControllerI {
    follow(req: Request, res: Response): void;

    unfollow(req: Request, res: Response): void;

    viewFollowers(req: Request, res: Response): void;

    userFollowing(req: Request, res: Response): void;
};