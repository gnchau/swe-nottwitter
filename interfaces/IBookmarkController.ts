import {Request, Response} from "express";

export default interface IBookmarkController {
    bookmarks(req: Request, res: Response): void;

    unBookmark(req: Request, res: Response): void;

    viewBookmarks(req: Request, res: Response): void;
}