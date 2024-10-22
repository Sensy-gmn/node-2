import cors from "cors";
import "dotenv/config";
import express from "express";
import PostsRouter from "./routes/PostsRouter.js";
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

// ---------------- [ HOME ] ---------------- //
app.get("/", (req, res) => {
    return res.json({ message: "first endpoint, Hello !" });
});

// ---------------- [ POSTS ] ---------------- //
app.use("/posts", PostsRouter);

// ---------------- [ SERVER RUN ] ---------------- //
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
