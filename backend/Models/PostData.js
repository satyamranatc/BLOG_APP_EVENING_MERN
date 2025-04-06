import mongoose from 'mongoose';

let PostDataSchema = new mongoose.Schema({

    comments: [{
        user: String,
        comment: String,
        createdAt: { type: Date, default: Date.now }
    }],
    //Likes:
    Likes:{
        type: Number,
        default: 0
    },


});

export default mongoose.model('PostData', PostDataSchema);