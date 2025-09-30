import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ResumeUploadPage from "./pages/ResumeUpload";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/resume-upload" element={<ResumeUploadPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
