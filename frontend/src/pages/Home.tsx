import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button"; // Shadcn Button

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full relative bg-black flex flex-col">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.25), transparent 70%), #000000",
        }}
      />

      <div className="relative z-50 flex flex-col items-center justify-center flex-1 pb-6 text-center">
        <Navbar />

        <h1 className="font-sans text-5xl font-bold text-white mt-10 mb-6 tracking-tight">
          Crisp AI Interview Assistant
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-12">
          Simulate interviews, evaluate candidates, and get instant feedback. Upload your resume
          and start your AI-powered journey.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          <Button
           className="bg-[#5c128a]"
            size="lg"
            onClick={() => navigate("/resume-upload")}
          >
            Start Interview
          </Button>

          <Button
          variant={"outline"}
            className="text-green-500 " 
            size="lg"
            onClick={() => navigate("/interviewer")}
          >
            Open Dashboard
          </Button>
        </div>

        <footer className="mt-20 text-slate-400 text-sm">
          Swipe Internship Assignment
        </footer>
      </div>
    </div>
  );
}
