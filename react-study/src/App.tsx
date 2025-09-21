import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Input from "./pages/Input";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input" element={<Input />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
