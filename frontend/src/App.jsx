import { Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import PostProduct from "./pages/PostProduct";

function App() {
  return (
    <div>
      <nav className="p-4 bg-gray-200">
        <Link className="mr-4" to="/products">Products</Link>
        <Link to="/post">Add Product</Link>
      </nav>

      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/post" element={<PostProduct />} />
      </Routes>
    </div>
  );
}

export default App;
