import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'
import backendUrl from "../control.js";

export default function PostProduct() {
  const [name, setName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendUrl}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, imageLink, price: Number(price) })
      });
      if (!res.ok) throw new Error("Failed to submit");
      const data = await res.json();
      console.log("Product added:", data);
      navigate("/products"); // Submit হলে products page এ নিয়ে যাবে
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Image Link"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
