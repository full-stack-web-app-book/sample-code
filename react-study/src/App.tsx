import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import InputPage from "./pages/Input";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input" element={<InputPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
