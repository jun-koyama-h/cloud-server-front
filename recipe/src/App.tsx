import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./view/Login";
import Top from "./view/Top"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Login />} />
        <Route path={`/Top`} element={<Top />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;