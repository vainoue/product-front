import React from "react";
import { useNavigate } from "react-router-dom";

import './ProductItem.css';

export default function ProductItem({ product, onEdit, onRemove }) {

    const navigate = useNavigate();

    return (
        <li className="product-item">
            <span>
                {product.name} - ${product.price ? Number(product.price).toFixed(2) : "Invalid price"}
            </span>
            <div className="product-item-buttons">
                <button onClick={() => navigate(`/edit-product/${product.id}`)} style={{ marginRight: "8px" }}>Edit</button>
                <button onClick={() => onRemove(product.id)}>Remove</button>
            </div>
        </li>
    );
}