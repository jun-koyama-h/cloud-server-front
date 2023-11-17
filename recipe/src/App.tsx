import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./view/Login";
import Top from "./view/Top"
import Result from "./view/Result"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Login />} />
        <Route path={`/Top`} element={<Top />} />
        <Route path={`/Result`} element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;