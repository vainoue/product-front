import { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import EditProductForm from '../components/EditProductForm';
import ConfirmToast from '../components/ConfirmToast';
import { getProducts, createProduct, removeProduct, editProduct as updateProduct } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

import '../App.css'

export default function Product() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const list = await getProducts();
    setProducts(list);
  };

  const handleAdd = async (product) => {
    try {
      await createProduct(product);
      await loadProducts();
      toast.success("New product added!");
    } catch (error) {
      toast.error(error.message.includes("price") ? "Invalid price" : "Error: " + error.message);
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
  };

  const handleRemove = async (id) => {
    const onConfirm = async () => {
      try {
        await removeProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast.success("Product removed!");
      } catch (error) {
        toast.error("Failed to remove product: " + error.message);
      }
    };

    const onCancel = () => {};

    toast.info(<ConfirmToast message="Would you like to remove this product?" onConfirm={onConfirm} onCancel={onCancel} />, {
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
    });
  };

  const handleSave = async (product) => {
    try {
      await updateProduct(product.id, product);
      toast.success("Product updated!");
      setEditProduct(null);
      await loadProducts();
    } catch (error) {
      toast.error("Error updating product: " + error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditProduct(null);
  };

  const sortedProducts = () => {
    return [...products].sort((a, b) =>
      sortOrder === "asc" ? a.id - b.id : b.id - a.id
    );
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  }

  return (
    <div className="app-container">
        <div className="header-container">
            <h1>Products</h1>
            <span className="username">Hello, {user?.username}</span>
            <button onClick={handleLogout} className="logout-button" title="Logout">Logout</button>
        </div>
        <label htmlFor="sortOrder"> Sort by ID: </label>
        <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-select"
        >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
      {!editProduct && <ProductForm onAdd={handleAdd} />}
      {editProduct && (
        <EditProductForm
          product={editProduct}
          onSave={handleSave}
          onCancel={handleCancelEdit}
        />
      )}
      <ProductList
        products={sortedProducts()}
        onRemove={handleRemove}
        onEdit={handleEditClick}
      />
      <ToastContainer position="top-right" autoClose={2500}/>
    </div>
  );
}