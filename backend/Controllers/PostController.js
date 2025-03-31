import PostModel from "../Models/PostModel.js";

export const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find({});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = new PostModel({
        poster: req.body.poster,
        title: req.body.title,
        desc: req.body.desc,
        author: req.body.author,
    })
    await post.save();
    res.status(201).json(post);
};

export const updatePost = async (req, res) => {
    try {
        const post = await PostModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await PostModel.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};