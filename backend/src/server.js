import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDatabase } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middlewares/rateLimiter.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}))
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

connectDatabase().then(() => {
    app.listen(port, () => {
        console.log(`server running on http://localhost:${port}`);
    });
});