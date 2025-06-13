import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDatabase } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middlewares/rateLimiter.js';
import cors from 'cors';
import path from 'path';

dotenv.config();

const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: true,
    }));
}

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend', 'dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
    });
}

connectDatabase().then(() => {
    app.listen(port, () => {
        console.log(`server running on http://localhost:${port}`);
    });
});