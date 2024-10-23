import Post from "../Models/Posts.js";

export const GetAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const GetPostById = async (req, res) => {
    const PostById = await Post.findById(req.params.id);
    try {
        if (!PostById) {
            return res
                .status(404)
                .json({ message: `Aucun post pour l'id ${req.params.id}` });
        }
        return res.status(200).json(PostById);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const CreatePost = async (req, res) => {
    checkPost(req, res);

    const newPost = await Post.create(req.body);

    try {
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const UpdatePost = async (req, res) => {
    checkPost(req, res);

    const updatedPost = req.body;

    try {
        const post = await Post.findByIdAndUpdate(req.params.id, updatedPost);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const DeletePost = async (req, res) => {
    checkPostToDelete(req, res);
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
