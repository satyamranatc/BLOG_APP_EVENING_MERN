import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import bodyParser from 'body-parser';
import postRoutes from './Routes/PostRoutes.js';
import userRoutes from './Routes/UserRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Connected to MongoDB');
})


app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

