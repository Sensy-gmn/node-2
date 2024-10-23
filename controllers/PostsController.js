import Post from "../Models/Posts.js";

export const GetAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const GetPostByUserId = async (req, res) => {
    let { id } = req.params;

    try {
        const posts = await Post.find({ userId: id });

        if (!posts) {
            return res.status(404).json({
                message: `Aucun post trouvé pour l'utilisateur avec l'id ${id}`,
            });
        }
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const GetPostById = async (req, res) => {
    let { id } = req.params;

    const PostById = await Post.findById(id);

    try {
        if (!PostById) {
            return res
                .status(404)
                .json({ message: `Aucun post pour l'id ${id}` });
        }
        return res.status(200).json(PostById);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const CreatePost = async (req, res) => {
    let { title, body, userId } = req.body;

    try {
        if (!body || !title || !userId) {
            return res.status(400).json({
                message: "Le champ title, body et userId sont requis.",
            });
        }
        const newPost = await Post.create({ title, body, userId });
        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const UpdatePost = async (req, res) => {
    let { id } = req.params;
    let { title, body, userId } = req.body;

    try {
        const post = await Post.findByIdAndUpdate(id, {
            title,
            body,
            userId,
        });
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const DeletePost = async (req, res) => {
    let { id } = req.params;

    try {
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({
                message: `Aucun post trouvé pour l'id ${id}`,
            });
        }
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
