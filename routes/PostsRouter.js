import { Router } from "express";
import Post from "../Models/Posts.js";
import { checkPost, checkPostToDelete } from "../utils/methods.js";

const PostsRouter = Router();

PostsRouter.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET posts by id ---------------------------
PostsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const postToFind = await Post.findById(id);

        if (postToFind) {
            return res.status(200).json(postToFind);
        }

        return res.status(404).json({ message: `Aucun post pour l'id ${id}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a post -------------------------------
PostsRouter.post("/", async (req, res) => {
    checkPost(req, res);

    const lastPost = await Post.find().sort({ id: -1 }).limit(1);

    const newPost = {
        title: req.body.title,
        body: req.body.body,
    };

    try {
        const post = await Post.create(newPost);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a post -----------------------------
PostsRouter.put("/:id", async (req, res) => {
    checkPost(req, res);

    const { id } = req.params;
    const updatedPost = req.body;

    try {
        const post = await Post.findByIdAndUpdate(id, updatedPost);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE a post -----------------------------
PostsRouter.delete("/:id", async (req, res) => {
    checkPostToDelete(req, res);
    const { id } = req.params;

    try {
        const post = await Post.findByIdAndDelete(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default PostsRouter;
