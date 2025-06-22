import React from "react";

import './ConfirmToast.css';

export default function ConfirmToast({ message, onConfirm, onCancel, closeToast }) {
    return (
        <div>
            <p>{message}</p>
            <button
                onClick={() => {
                    onConfirm();
                    closeToast();
                }}
                className="toast-confirm"
            >
                Confirm
            </button>
            <button onClick={() => {onCancel(); closeToast();
                }}
                className="toast-cancel"
            >
                Cancel
            </button>
        </div>
    );
}