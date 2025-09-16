import { useEffect, useState } from "react";
import backendUrl from "../control.js";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedImage, setEditedImage] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  const fetchProducts = async () => {
    const res = await fetch(`${backendUrl}/api/products`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    await fetch(`${backendUrl}/api/products/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  // Start editing
  const startEdit = (product) => {
    setEditingId(product._id);
    setEditedName(product.name);
    setEditedImage(product.imageLink);
    setEditedPrice(product.price);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditedName("");
    setEditedImage("");
    setEditedPrice("");
  };

  // Submit update
  const handleUpdate = async (id) => {
    await fetch(`${backendUrl}/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editedName,
        imageLink: editedImage,
        price: Number(editedPrice),
      }),
    });
    setEditingId(null);
    fetchProducts();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg shadow p-4 text-center">
            {editingId === product._id ? (
              <div>
                <input
                  className="border p-1 mb-1 w-full"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <input
                  className="border p-1 mb-1 w-full"
                  value={editedImage}
                  onChange={(e) => setEditedImage(e.target.value)}
                />
                <input
                  className="border p-1 mb-1 w-full"
                  type="number"
                  value={editedPrice}
                  onChange={(e) => setEditedPrice(e.target.value)}
                />
                <div className="flex justify-between mt-2">
                  <button onClick={() => handleUpdate(product._id)} className="bg-green-500 text-white px-2 rounded">Save</button>
                  <button onClick={cancelEdit} className="bg-gray-400 text-white px-2 rounded">Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <img src={product.imageLink} alt={product.name} className="w-full h-40 object-cover rounded mb-3" />
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-green-600 font-bold">${product.price}</p>
                <div className="flex justify-between mt-2">
                  <button onClick={() => startEdit(product)} className="bg-blue-500 text-white px-2 rounded">Edit</button>
                  <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-2 rounded">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}