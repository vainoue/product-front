import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import ConfirmToast from '../components/ConfirmToast';
import { getProducts, removeProduct } from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

import '../App.css'

export default function Product() {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const currentPhoto = user?.photo ? `data:image/*;base64,${user.photo}` : null;

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const list = await getProducts();
    setProducts(list);
  };

  const handleEditClick = (product) => {
    navigate(`/edit-product/${product.id}`);
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

    const onCancel = () => { };

    toast.info(<ConfirmToast message="Would you like to remove this product?" onConfirm={onConfirm} onCancel={onCancel} />, {
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
    });
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
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="app-container">
      <div className="user-info-container">
        <div className="user-greeting">
          <span>Hello, <strong>{user?.username}</strong></span>
        </div>
        {currentPhoto && (<img src={currentPhoto} alt="User Photo" className="user-photo" />)}
        <div className="user-actions">
          <button onClick={handleEditProfile} className="edit-profile-button" title="Edit Profile">Edit Profile</button>
          <button onClick={handleLogout} className="logout-button" title="Logout">Logout</button>
        </div>
      </div>
      <div className="products-section">
        <h1>Products</h1>
        <div className="products-header">
          <button onClick={() => navigate("/new-product")} className="edit-profile-button">Add New Product</button>
        </div>
        <div className="products-controls">
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
        </div>
        <ProductList
          products={sortedProducts()}
          onRemove={handleRemove}
          onEdit={handleEditClick}
        />
      </div>
    </div>
  );
}