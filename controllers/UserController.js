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
    let { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Les champ name, email et password sont requis.",
            });
        }
        const NewUser = await User.create({ name, email, password });
        res.status(201).json(NewUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const UpdateUser = async (req, res) => {
    let { id } = req.params;
    let { name, email, password } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, password },
            { new: true }
        );
        res.status(200).json(updatedUser);
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
