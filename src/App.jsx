import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListUsers from "./components/ListUsers";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
        <Route path="/users" element={<ListUsers />} />
          {/* Другие маршруты, если есть */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
