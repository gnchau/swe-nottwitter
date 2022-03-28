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


const cors = require('cors');
// build the connection string, not using for now
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = "cluster0.5p0fs.mongodb.net";
const DB_NAME = "myFirstDatabase";
const DB_QUERY = "retryWrites=true&w=majority";

//const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
const connectionString = "mongodb+srv://mongouser:1234@cluster0.5p0fs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(connectionString);
const app = express();
app.use(bodyParser.json());
app.use(cors());

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);

app.get('/', (req, res) =>
    res.send('Hello World!'));

/**
 * Starts a server by listening to port 4000 locally.
 * If the app is deployed on Heroku, the environment variable
 * PORT will be used instead if available.
 */

const PORT = 4000;
app.listen(process.env.PORT || PORT);