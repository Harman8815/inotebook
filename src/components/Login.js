import { useState } from "react";
import React from "react";
import { useNavigate  } from 'react-router-dom'

const Login = (props) => {
    const Loginhost = "http://localhost:8080/api/auth/login";
    const [auth, setAuth] = useState({ email: "", password: "" });
    let navigate  = useNavigate ();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(Loginhost, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(auth),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            // console.log("Response data:", data);
            console.log(data);
            localStorage.setItem("authtoken", data.token.toString());
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const onChange = (e) => {
        setAuth({ ...auth, [e.target.name]: e.target.value });
        
        props.showAlert("Log in sucessfully","success");

    };

    return (
        <>
        <div className="container mt-3" style={{ width: "600px" }}>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        name="email"
                        value={auth.email}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="password"
                        value={auth.password}
                        onChange={onChange}
                    />
                </div>
                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        Check me out
                    </label>
                </div> */}
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
            </div>
        </>
    );
};

export default Login;
