import express from "express";
import resumeRoutes from './routes/resume.route';
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use("/api/resume", resumeRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});