import "./App.css";
import AddProduct from "./components/AddProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import NavBar from "./components/NavBar";


function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
        </div>
        <Routes>
          <Route path="/home" element={<Products />} />
          <Route path="/add/product" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
