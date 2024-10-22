import express from "express";
import { DataPosts } from "../data.js";
import {
    addPost,
    checkPost,
    checkPostToDelete,
    deletePost,
    updatePost,
} from "../methods.js";

const PostsRouter = express.Router();

PostsRouter.get("/", (req, res) => {
    return res.status(200).json(DataPosts);
});

// GET posts by id ---------------------------
PostsRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    let postToFind = DataPosts.find((post) => post.id === parseInt(id));

    if (postToFind) {
        return res.status(200).json(postToFind);
    }

    return res.status(404).json({ message: `Aucun post pour l'id ${id}` });
});

// POST a post -------------------------------
PostsRouter.post("/", (req, res) => {
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
PostsRouter.put("/:id", (req, res) => {
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
PostsRouter.delete("/:id", (req, res) => {
    checkPostToDelete(req, res);
    const { id } = req.params;

    try {
        deletePost(id);
        res.status(200).json({ message: "Post supprimé avec succès !" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default PostsRouter;
