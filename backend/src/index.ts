import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import resumeRoutes from './routes/resume.route';
import geminiRoutes from './routes/gemini.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/resume", resumeRoutes);

app.use("/api/ai", geminiRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});