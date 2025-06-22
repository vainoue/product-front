import React, { useState } from "react";
import TextInput from "./TextInput";
import SubmitButton from "./SubmitButton";
import { toast } from "react-toastify";

import './EditProductForm.css';

export default function EditProductForm ({ product, onSave, onCancel }) {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price.toString());

    const handleSubmit = () => {
        if (!name || !price) {
            toast.warn("Please fill in all fields.");
            return;
        }
        onSave({ ...product, name, price: Number(price) });
    };

    return (
        <div className="edit-product-form">
            <h2>Edit Product</h2>
            <TextInput
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextInput
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <SubmitButton onClick={handleSubmit}>Confirm</SubmitButton>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}