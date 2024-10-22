import cors from "cors";
import "dotenv/config";
import express from "express";
import { DataPosts } from "./data.js";
import {
    addPost,
    checkPost,
    checkPostToDelete,
    deletePost,
    updatePost,
} from "./methods.js";

const app = express();
const PORT = process.env.PORT;
// const API_BASE_URL = "https://jsonplaceholder.typicode.com";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    return res.json({ message: "first endpoint, Hello !" });
});

app.get("/posts", (req, res) => {
    return res.status(200).json(DataPosts);
});

// --------------------------------- [ POSTS ] --------------------------------- //

// GET posts by id ---------------------------
app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    let postToFind = DataPosts.find((post) => post.id === parseInt(id));

    if (postToFind) {
        return res.status(200).json(postToFind);
    }

    return res.status(404).json({ message: `Aucun post pour l'id ${id}` });
});

// POST a post -------------------------------
app.post("/posts", (req, res) => {
    checkPost(req, res);

    const lastPost = DataPosts[DataPosts.length - 1];
    const newId = lastPost.id + 1;

    const newPost = {
        userId: 12,
        id: newId,
        title: req.body.title,
        body: req.body.body,
    };

    try {
        addPost(newPost);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a post -----------------------------
app.put("/posts/:id", (req, res) => {
    checkPost(req, res);

    const { id } = req.params;
    const updatedPost = req.body;

    try {
        updatePost(id, updatedPost);
        res.status(200).json({ message: "Post modifié avec succès !" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE a post -----------------------------
app.delete("/posts/:id", (req, res) => {
    checkPostToDelete(req, res);
    const { id } = req.params;

    try {
        deletePost(id);
        res.status(200).json({ message: "Post supprimé avec succès !" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
