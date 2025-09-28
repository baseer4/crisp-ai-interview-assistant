import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GraduationCap, LayoutDashboard } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
   <div className="min-h-screen w-full bg-[#f9fafb] relative">
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
      backgroundSize: "32px 32px",
      WebkitMaskImage:
        "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
      maskImage:
        "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
    }}
  />

  <div className="min-h-screen flex flex-col items-center justify-center text-black p-6 relative z-50">
      <div className="text-center max-w-2xl mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Crisp AI Interview Assistant
        </h1>
        <p className="text-lg text-slate-300">
          An AI-powered tool to simulate interviews and evaluate candidates.
          Upload your resume, answer timed questions, and see results instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        <Card
          className="cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate("/interviewee")}
        >
          <CardHeader>
            <GraduationCap className="w-10 h-10 mb-2 text-indigo-500" />
            <CardTitle>Start Interview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Upload your resume and begin a 6-question timed interview tailored
              for full-stack roles.
            </p>
            <Button className="w-full" onClick={() => navigate("/interviewee")}>
              Go to Interview
            </Button>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate("/interviewer")}
        >
          <CardHeader>
            <LayoutDashboard className="w-10 h-10 mb-2 text-green-500" />
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              View candidates, their scores, summaries, and detailed interview
              history.
            </p>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => navigate("/interviewer")}
            >
              Open Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-16 text-slate-400 text-sm">
     Swipe Internship Assignment
      </footer>
    </div>
</div>
   
  );
}
