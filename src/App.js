import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import DisplayItems from "./pages/DisplayItems";
import AddItem from "./pages/AddItem";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<DisplayItems />} />
        <Route path="/add-item" element={<AddItem />} />
      </Routes>
    </div>
  );
}

export default App;
