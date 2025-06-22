import React from "react";

import './ProductItem.css';

export default function ProductItem({ product, onEdit, onRemove }) {
    return (
        <li className="product-item">
            <span>
                {product.name} - ${product.price ? Number(product.price).toFixed(2) : "Invalid price"}
            </span>
            <div className="product-item-buttons">
                <button onClick={() => onEdit(product)} style={{ marginRight: "8px" }}>Edit</button>
                <button onClick={() => onRemove(product.id)}>Remove</button>
            </div>
        </li>
    );
}