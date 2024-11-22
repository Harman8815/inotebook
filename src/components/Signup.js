import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    const Loginhost = "http://localhost:8080/api/auth/createuser";
    const [auth, setAuth] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState(""); // For showing password mismatch error
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if passwords match
        if (auth.password !== auth.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setError(""); // Clear any existing error

        try {
            const response = await fetch(Loginhost, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: auth.name,
                    email: auth.email,
                    password: auth.password,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            localStorage.setItem("authtoken", data.token.toString());
            navigate("/");
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    const onChange = (e) => {
        setAuth({ ...auth, [e.target.name]: e.target.value });
        
        props.showAlert("Sign up sucessfully","success");

    };

    return (
        <div className="container mt-3" style={{ width: "600px" }}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={auth.name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email Address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={auth.email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={auth.password}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={auth.confirmPassword}
                        onChange={onChange}
                        required
                    />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Signup;

