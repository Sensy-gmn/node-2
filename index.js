import axios from "axios";
import cors from "cors";
import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT;
const API_BASE_URL = "https://jsonplaceholder.typicode.com";
const POSTS_ENDPOINT = "/posts";

app.use(cors());

app.get("/", (req, res) => {
    return res.json({ message: "Hello :)" });
});

app.get("/posts", (req, res) => {
    axios
        .get(`${API_BASE_URL}${POSTS_ENDPOINT}`)
        .then((response) => {
            return res.status(200).json(response.data);
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
});

// POSTS BY USER ID ---------------------------------------------------
app.get("/posts/:userId", (req, res) => {
    const { userId } = req.params;
    axios
        .get(`${API_BASE_URL}${POSTS_ENDPOINT}?userId=${userId}`)
        .then((response) => {
            return res.status(200).json(response.data);
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
});

// POSTS BY ID ---------------------------------------------------
app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    axios
        .get(`${API_BASE_URL}${POSTS_ENDPOINT}/${id}`)
        .then((response) => {
            return res.status(200).json(response.data);
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
