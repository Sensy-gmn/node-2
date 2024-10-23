import User from "../Models/User.js";
import UserSchema from "../Validator/UserValidator.js";

export const GetAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const GetUserById = async (req, res) => {
    let { id } = req.params;

    try {
        const userById = await User.findById(id);

        if (!userById) {
            return res.status(404).json({
                message: `Aucun utilisateur trouvé pour l'id ${id}`,
            });
        }
        return res.status(200).json(userById);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const CreateUser = async (req, res) => {
    let { first_name, last_name, email, password } = req.body;

    try {
        const { error, value } = UserSchema.validate({
            first_name,
            last_name,
            email,
            password,
        });

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        } else {
            const NewUser = await User.create(value);
            res.status(201).json(NewUser);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const UpdateUser = async (req, res) => {
    let { id } = req.params;
    let { first_name, last_name, email, password } = req.body;

    try {
        const { error, value } = UserSchema.validate({
            first_name,
            last_name,
            email,
            password,
        });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        } else {
            const updatedUser = await User.findByIdAndUpdate(id, value, {
                new: true,
            });
            res.status(200).json(updatedUser);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const DeleteUser = async (req, res) => {
    let { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({
                message: `Aucun utilisateur trouvé pour l'id ${id}`,
            });
        }
        return res
            .status(200)
            .json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
