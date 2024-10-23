import { Router } from "express";
import {
    CreatePost,
    DeletePost,
    GetAllPosts,
    GetPostById,
    GetPostByUserId,
    UpdatePost,
} from "../controllers/PostsController.js";

const PostsRouter = Router();

PostsRouter.get("/", GetAllPosts);
PostsRouter.get("/:id", GetPostById);
PostsRouter.get("/specificUser/:id", GetPostByUserId);

PostsRouter.post("/", CreatePost);

PostsRouter.put("/:id", UpdatePost);

PostsRouter.delete("/:id", DeletePost);

export default PostsRouter;
