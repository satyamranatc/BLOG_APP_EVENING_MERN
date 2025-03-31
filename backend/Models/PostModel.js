import mongoose from 'mongoose';

let PostSchema = new mongoose.Schema({
    poster: String,
    title: String,
    desc: String,
    author: String,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Post', PostSchema);