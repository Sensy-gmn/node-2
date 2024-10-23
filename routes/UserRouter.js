import { Router } from "express";
import User from "../Models/User.js";

const UserRouter = Router();

UserRouter.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default UserRouter;
