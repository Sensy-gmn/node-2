import { Router } from "express";
import {
    CreateUser,
    DeleteUser,
    GetAllUsers,
    GetUserById,
    UpdateUser,
} from "../controllers/UserController.js";

const UserRouter = Router();

UserRouter.get("/", GetAllUsers);
UserRouter.get("/:id", GetUserById);

UserRouter.post("/", CreateUser);

UserRouter.put("/:id", UpdateUser);

UserRouter.delete("/:id", DeleteUser);

export default UserRouter;
