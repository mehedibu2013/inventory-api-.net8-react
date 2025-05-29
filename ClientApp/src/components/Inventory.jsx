import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Inventory = () => {
  const { token, logout } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [newProduct, setNewProduct] = useState({
    sku: '',
    name: '',
    quantityInStock: 0,
    unitPrice: 0,
  });

  // Fetch products on load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/inventory`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
        setError('');
      } catch (err) {
        if (err.response?.status === 401) {
          logout();
          window.location.href = '/login';
        }
        setError('Failed to fetch products');
      }
    };
    if (token) fetchProducts();
  }, [token, logout]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === 'quantityInStock' || name === 'unitPrice' ? Number(value) : value,
    }));
  };

  // Handle form submission to add a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/inventory`,
        newProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts((prev) => [...prev, response.data]); // Add new product to list
      setNewProduct({ sku: '', name: '', quantityInStock: 0, unitPrice: 0 }); // Reset form
      setError('');
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        window.location.href = '/login';
      }
      setError('Failed to add product');
    }
  };

  return (
    <div>
      <h2>Inventory</h2>

      {/* Form to add a new product */}
      <h3>Add New Product</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleAddProduct}>
        <div>
          <label>SKU</label>
          <input
            type="text"
            name="sku"
            value={newProduct.sku}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Quantity in Stock</label>
          <input
            type="number"
            name="quantityInStock"
            value={newProduct.quantityInStock}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Unit Price</label>
          <input
            type="number"
            step="0.01"
            name="unitPrice"
            value={newProduct.unitPrice}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>

      {/* Display existing products */}
      <h3>Product List</h3>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.sku}>
              {product.name} (SKU: {product.sku}) - {product.quantityInStock} units @ ${product.unitPrice}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Inventory;