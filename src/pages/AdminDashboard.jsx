import React, { useState } from "react";

const ProductInputPanel = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    model: "",
    description: "",
    price: "",
    stock: 0,
    image: "",
    specifications: {
      processor: "",
      ram: "",
      storage: "",
      battery: "",
      display: "",
      camera: "",
    },
  });

  const brands = ["Samsung", "Apple", "OnePlus", "Xiaomi", "Realme", "Motorola"];
  const processors = [
    "Snapdragon 8 Gen 2",
    "Snapdragon 7 Gen 1",
    "MediaTek Dimensity 9200",
    "Apple A17 Bionic",
    "Exynos 2200",
  ];
  const rams = ["4 GB", "6 GB", "8 GB", "12 GB"];
  const storages = ["64 GB", "128 GB", "256 GB", "512 GB"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("specifications.")) {
      const specKey = name.split(".")[1];
      setProduct((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specKey]: value,
        },
      }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Product:", product);

    // axios.post('/api/products', product)
    //   .then(res => console.log(res))
    //   .catch(err => console.error(err));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Basic Info */}
        <div className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* Brand Dropdown */}
          <div>
            <label className="block font-medium">Brand</label>
            <select
              name="brand"
              value={product.brand}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Select a brand</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Model */}
          <div>
            <label className="block font-medium">Model</label>
            <input
              type="text"
              name="model"
              value={product.model}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-medium">Image URL</label>
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>

        {/* Right Side: Specifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Specifications</h3>

          {/* Processor Dropdown */}
          <div>
            <label className="block font-medium">Processor</label>
            <select
              name="specifications.processor"
              value={product.specifications.processor}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Processor</option>
              {processors.map((proc) => (
                <option key={proc} value={proc}>
                  {proc}
                </option>
              ))}
            </select>
          </div>

          {/* RAM Dropdown */}
          <div>
            <label className="block font-medium">RAM</label>
            <select
              name="specifications.ram"
              value={product.specifications.ram}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select RAM</option>
              {rams.map((ram) => (
                <option key={ram} value={ram}>
                  {ram}
                </option>
              ))}
            </select>
          </div>

          {/* Storage Dropdown */}
          <div>
            <label className="block font-medium">Storage (ROM)</label>
            <select
              name="specifications.storage"
              value={product.specifications.storage}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Storage</option>
              {storages.map((storage) => (
                <option key={storage} value={storage}>
                  {storage}
                </option>
              ))}
            </select>
          </div>

          {/* Battery */}
          <div>
            <label className="block font-medium">Battery</label>
            <input
              type="text"
              name="specifications.battery"
              value={product.specifications.battery}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Display */}
          <div>
            <label className="block font-medium">Display</label>
            <input
              type="text"
              name="specifications.display"
              value={product.specifications.display}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Camera */}
          <div>
            <label className="block font-medium">Camera</label>
            <input
              type="text"
              name="specifications.camera"
              value={product.specifications.camera}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="lg:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductInputPanel;
