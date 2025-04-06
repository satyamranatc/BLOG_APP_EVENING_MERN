import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
    FullName: String,
    profilePic: String,
    username: String,
    password: String,
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('UserModel', UserSchema);