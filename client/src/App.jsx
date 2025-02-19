import { Router, Route, Routes } from "react-router-dom";
import Recipes from "./pages/Recipes";
import AppBar from "./components/AppBar";
import CheckBoxFilter from "./components/AppBar";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import "./styles.css";

function App() {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </>
  );
}

export default App;
