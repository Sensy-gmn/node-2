import { Router } from "express";
import {
    CreateComment,
    DeleteComment,
    GetAllComments,
    GetCommentById,
    GetCommentByPostId,
    GetCommentByUserId,
    UpdateComment,
} from "../controllers/CommentController.js";

const CommentRouter = Router();

CommentRouter.get("/", GetAllComments);
CommentRouter.get("/:id", GetCommentById);
CommentRouter.get("/user/:id", GetCommentByUserId);
CommentRouter.get("/forPost/:id", GetCommentByPostId);

CommentRouter.post("/", CreateComment);

CommentRouter.put("/:id", UpdateComment);

CommentRouter.delete("/:id", DeleteComment);

export default CommentRouter;
