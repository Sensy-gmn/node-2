import { Router } from "express";
import {
    CreateComment,
    DeleteComment,
    GetAllComments,
    GetCommentById,
    UpdateComment,
} from "../controllers/CommentController.js";

const CommentRouter = Router();

CommentRouter.get("/", GetAllComments);
CommentRouter.get("/:id", GetCommentById);

CommentRouter.post("/", CreateComment);

CommentRouter.put("/:id", UpdateComment);

CommentRouter.delete("/:id", DeleteComment);

export default CommentRouter;
