import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import CommentRouter from "./routes/CommentRouter.js";
import PostsRouter from "./routes/PostsRouter.js";
import UserRouter from "./routes/UserRouter.js";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

// ---------------- [ HOME ] ---------------- //
app.get("/", (req, res) => {
    try {
        return res.json({ message: "first endpoint, Hello !" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const mongoDB = process.env.MONGO_URI;

mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connecté à MongoDB"));

// ---------------- [ POSTS ] ---------------- //
app.use("/posts", PostsRouter);

// ---------------- [ USERS ] ---------------- //
app.use("/users", UserRouter);

// ---------------- [ COMMENTS ] ---------------- //
app.use("/comments", CommentRouter);

// ---------------- [ SERVER RUN ] ---------------- //
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
