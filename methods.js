import { DataPosts } from "./data.js";

export function addPost(newPost) {
    DataPosts.push(newPost);
}

export function updatePost(id, updatedPost) {
    let postToUpdate = DataPosts.find((post) => post.id === parseInt(id));
    DataPosts[postToUpdate] = updatedPost;
}

export function deletePost(id) {
    let postToDelete = DataPosts.find((post) => post.id === parseInt(id));
    DataPosts.splice(postToDelete, 1);
}

export const checkPost = (req, res) => {
    let ok = true;
    if (!req.body || !req.body.title || !req.body.body) {
        ok = false;
        return res
            .status(400)
            .json({ message: "Tous les champs sont requis !" });
    } else {
        return ok;
    }
};

export const checkPostToDelete = (req, res) => {
    let ok = true;
    if (!req.params.id) {
        ok = false;
        return res.status(400).json({ message: "L'id est requis !" });
    } else {
        return ok;
    }
};
