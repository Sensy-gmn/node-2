import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import EmailSchema from "../Validator/EmailValidator.js";
import PasswordSchema from "../Validator/PasswordValidator.js";
import UserSchema from "../Validator/UserValidator.js";

dotenv.config();

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
    try {
        const { error } = UserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let { email, password, first_name, last_name } = req.body;

        if ((!email, !password)) {
            return res
                .status(404)
                .json(`Veuillez fournir un email et un mot de passe`);
        }

        const validateEmail = await User.findOne({ email });
        if (validateEmail) {
            return res.status(404).json(`Email déjà utilisé`);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({
            email,
            password: hashedPassword,
            first_name,
            last_name,
        });

        return res.status(201).json(`User créé avec succès`);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Internal server error 🔴` });
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Valider email
        const emailValidation = EmailSchema.validate({ email });
        if (emailValidation.error) {
            return res
                .status(400)
                .json({ message: emailValidation.error.details[0].message });
        }

        // Vérifier password
        const passwordValidation = PasswordSchema.validate({ password });
        if (passwordValidation.error) {
            return res
                .status(400)
                .json({ message: passwordValidation.error.details[0].message });
        }

        // user exist ?
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ message: "Email ou mot de passe invalide" });
        }

        // Password vérif
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            return res
                .status(404)
                .json({ message: "Email ou mot de passe invalide" });
        }

        // Vérifier JWT_SECRET
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET n'est pas défini");
            return res
                .status(500)
                .json({ message: "Configuration du serveur incorrecte" });
        }

        // Générer le token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        return res.status(200).json({ token });
    } catch (err) {
        console.error("Erreur lors de la connexion:", err);
        return res
            .status(500)
            .json({ message: "Internal server error 🔴", error: err.message });
    }
});

export default authRouter;
