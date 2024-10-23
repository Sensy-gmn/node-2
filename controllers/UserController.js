import User from "../Models/User.js";

export const GetAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const GetUserById = async (req, res) => {
    try {
        const userById = await User.findById(req.params.id);

        if (!userById) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(userById);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const CreateUser = async (req, res) => {
    try {
        const NewUser = await User.create(req.body);
        res.status(201).json(NewUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const UpdateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const DeleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
