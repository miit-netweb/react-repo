import "./App.css";
import AddProduct from "./components/AddProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import CartPage from "./components/CartPage";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";


function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
        </div>
        <Routes>
          {/* <Route path="/" element={<Products />} /> */}
          <Route path="/home" element={<Products />} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/add/product" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
