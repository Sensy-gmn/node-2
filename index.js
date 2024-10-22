import cors from "cors";
import "dotenv/config";
import express from "express";
import DataPosts from "./data.js";

const app = express();
const PORT = process.env.PORT;
// const API_BASE_URL = "https://jsonplaceholder.typicode.com";

app.use(cors());

app.get("/", (req, res) => {
    return res.json({ message: "first endpoint, Hello !" });
});

app.get("/posts", (req, res) => {
    return res.status(200).json(DataPosts);
});

// POSTS BY USER ID ---------------------------------------------------
app.get("/posts/user/:userId", (req, res) => {
    const { userId } = req.params;
    let postsToFind = DataPosts.filter(
        (post) => post.userId === parseInt(userId)
    );

    if (postsToFind.length > 0) {
        return res.status(200).json(postsToFind);
    } else {
        return res
            .status(404)
            .json({ message: `Aucun post pour l'utilisateur ${userId}` });
    }
});

// POSTS BY ID ---------------------------------------------------
app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    let postToFind = DataPosts.find((post) => post.id === parseInt(id));

    if (postToFind) {
        return res.status(200).json(postToFind);
    } else {
        return res.status(404).json({ message: `Aucun post pour l'id ${id}` });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
