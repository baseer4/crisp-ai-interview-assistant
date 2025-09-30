import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen w-full relative bg-black flex flex-col">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.25), transparent 70%), #000000",
        }}
      />

      <div className="relative z-50 flex flex-col items-center justify-center flex-1 pb-6">
        <Outlet />
      </div>
    </div>
  );
}