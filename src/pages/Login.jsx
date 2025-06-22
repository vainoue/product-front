import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import { loginUser } from "../services/api";

import './Style.css';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            toast.warn("Please fill in all fields");
            return;
        }
        try {
            const data = await loginUser({ username, password });
            login({ username: data.username});
            toast.success("Login successful!");
            navigate("/products");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <button
                type="button"
                className="link-button"
                onClick={() => navigate("/register")}
            >
                Register here
            </button>
        </div>
    );
}