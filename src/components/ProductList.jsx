import React from "react";
import ProductItem from "./ProductItem";

import './ProductList.css';

export default function ProductList({ products, onEdit, onRemove }) {
    if (products.length === 0) return <p className="empty-message">No products found.</p>;
    return (
        <ul className="product-list">
            {products.map((p) => (
                <ProductItem
                    key={p.id}
                    product={p}
                    onEdit={onEdit}
                    onRemove={onRemove} />
            ))}
        </ul>
    );
}