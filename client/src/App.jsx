import { Route, Routes } from "react-router-dom";
import Recipes from "./pages/Recipes";
import AppBar from "./components/AppBar";
import CheckBoxFilter from "./components/AppBar";
import CreatePage from "./pages/CreatePage";
import "./styles.css";

function App() {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </>
  );
}

export default App;
