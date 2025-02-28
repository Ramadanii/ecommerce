// App.js
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Products from "./components/Products/Products";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isClick, setIsClick] = useState({});

  const handleAddToCart = (product) => {
    if (!isClick[product.id]) {
      setCartItems((prevItems) => [...prevItems, product]);
      setIsClick((prev) => ({ ...prev, [product.id]: true }));
    }
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setIsClick((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div>
      <Header cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />

      <Routes>
        <Route path="/" element={<Products handleAddToCart={handleAddToCart} isClick={isClick} />} />
        <Route path="/products/:id" element={<Product handleAddToCart={handleAddToCart} isClick={isClick} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;