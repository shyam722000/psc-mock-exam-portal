import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Language from "./pages/Language";
import Exam from "./pages/Exam";
import Result from "./pages/Result";
import Review from "./pages/Review";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/language" element={<Language />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/result" element={<Result />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
