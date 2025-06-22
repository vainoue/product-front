import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import { registerUser } from "../services/api";

import './Style.css';

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            toast.warn("Please fill in all fields.");
            return;
        }
        try {
            await registerUser({ username, password });
            login({ username });
            toast.success("Registration successful!");
            setUsername("");
            setPassword("");
            navigate("/products");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister} className="auth-form">
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
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account?{" "}
                <button
                    type="button"
                    className="link-button"
                    onClick={() => navigate("/login")}
                >
                    Login here
                </button>
            </p>
        </div>
    );
}