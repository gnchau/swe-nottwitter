/**
 * @file Implements an Express Node server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>Users</li>
 *     <li>Tuits</li>
 *     <li>Likes</li>
 *     <li>Follows</li>
 *     <li>Bookmarks</li>
 *     <li>Messages</li>
 * </ul>
 *
 * After Instantiation, this file connects to a remote MongoDB instance hosted
 * on its Atlas service.
 */

import express, {Request, Response} from "express";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";

import bodyParser from "body-parser";
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://gnchau:securepass1234123412341234@a2.pzayb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

const app = express();
app.use(bodyParser.json());

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);

app.get('', (req, res) =>
    res.send('Hello World!'));

/**
 * Starts a server by listening to port 4000 locally.
 * If the app is deployed on Heroku, the environment variable
 * PORT will be used instead if available.
 */

const PORT = 4000;
app.listen(process.env.PORT || PORT);