import express, {Request, Response} from "express";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import bodyParser from "body-parser";
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://gnchau:securepass12@cluster0.ytj7o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

const app = express();
app.use(bodyParser.json());

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);

app.get('', (req, res) =>
    res.send('Hello World!'));

const PORT = 4000;
app.listen(process.env.PORT || PORT);