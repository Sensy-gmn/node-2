import axios from "axios";
import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT;
const API_BASE_URL = "https://jsonplaceholder.typicode.com";
const POSTS_ENDPOINT = "/posts";

app.get("/", (req, res) => {
    return res.json({ message: "Hello :)" });
});

app.get("/posts", (req, res) => {
    axios
        .get(`${API_BASE_URL}${POSTS_ENDPOINT}`)
        .then((response) => {
            return res.json(response.data);
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
