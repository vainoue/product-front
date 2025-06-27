import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { toast } from 'react-toastify';
import { updateUser, updateUserPhoto } from "../services/api";
import { useNavigate } from "react-router-dom";
import './Style.css';

export default function EditProfile() {
    const { user } = useAuth();
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState(user?.birthdate || "");
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        /*console.log("user:", user);*/
        if (user?.photo) {
            setPreview(`data:image/*;base64,${user.photo}`);
        }
        if (user?.email && email === "") {
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("click save");
        if (!email && !birthdate) {
            toast.warn("Please fill at least one field");
            return;
        }

        try {
            await updateUser({ username: user.username, email, birthdate });
            toast.success("User updated successfully");
        } catch (err) {
            toast.error("Error updating user");
        }
    };

    const handlePhoto = (e) => {
        try {
            const file = e.target.files[0];
            if (file) {
                setPhoto(file);
                setPreview(URL.createObjectURL(file));
            }
        } catch {
            toast.error("No file selected");
        }
    };

    const handleUpPhoto = async () => {
        if (!photo) {
            toast.warn("Please select a photo");
            return;
        }

        /*console.log("User in handleUpPhoto:", user);*/

        const formData = new FormData();
        formData.append("userId", user.id.toString());
        formData.append("file", photo);

        try {
            await updateUserPhoto(formData);
            toast.success("Photo uploaded!");
        } catch {
            toast.error("Upload failed");
        }
    };

    return (
        <div className="edit-profile-center">
            <div className="edit-profile-container">
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="date"
                        value={birthdate?.split("T")[0] || ""}
                        onChange={(e) => setBirthdate(e.target.value)}
                    />
                    <button type="submit">Save</button>
                </form>
                <div className="photo-upload-container">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhoto}
                    />
                    {preview && <img src={preview} alt="Preview" className="photo-preview" />}
                    <button onClick={handleUpPhoto} className="submit-button" disabled={!photo}>Upload photo</button>
                    <button onClick={() => navigate("/products")} className="submit-button">Back</button>
                </div>
            </div>
        </div>
    );
}