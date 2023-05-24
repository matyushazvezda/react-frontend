import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListUsers from "./components/ListUsers";
import Concerts from "./components/Concerts";
import HeaderComponent from './components/HeaderComponent';
import MusicianDetails from './components/MusicianDetails';

import "./MusicianDetails.css"; 

function App() {
  return (
    <BrowserRouter>
      <div>
        <HeaderComponent/>
        <Routes>
          <Route path="/users" element={<ListUsers />} />
          <Route path="/" element={<Concerts />} />
          <Route path="/musicians/:id" element={<MusicianDetails />} />
          {/* Другие маршруты, если есть */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
