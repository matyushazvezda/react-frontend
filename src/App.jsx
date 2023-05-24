import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListUsers from "./components/ListUsers";
import Concerts from "./components/Concerts";
import HeaderComponent from './components/HeaderComponent';

function App() {
  return (
    <BrowserRouter>
      <div>
        <HeaderComponent/>
        <Routes>
        <Route path="/users" element={<ListUsers />} />
        <Route path='/concerts' element={<Concerts />} />
          {/* Другие маршруты, если есть */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
