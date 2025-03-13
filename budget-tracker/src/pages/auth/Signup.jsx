import React, {useContext, useState} from "react";
import AuthLayout from "../../components/layouts/AuthLayout.jsx";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input.jsx";
import { validateEmail } from "../../utils/helpers.js";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPath.js";
import {UserContext} from "../../context/UserContext.jsx";

const Signup = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { updateUser } = useContext(UserContext);

    const handleSignup = async (e) => {
        e.preventDefault(); // Prevents page refresh

         let profileImageUrl = "";
        if (!fullName) {
            setError("Full Name is required.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Invalid email format.");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        setError("");

       //Signup API call
        try{

            //upload image if present
            if(profilePic){
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password
            });
            const { token, user } = response.data;
            if (token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/dashboard");
            }
        } catch(err) {
            if(error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong!");
            }
        };

        // Simulate navigation after successful signup
       // navigate("/dashboard"); // Adjust the route as needed
    };

    return (
        <AuthLayout>
            <div className="w-full lg:w-[100%] mt-10 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Create an account</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Join us today by entering your details below
                </p>

                {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="flex justify-center">
                        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                            label="Full Name"
                            placeholder="Your full name"
                            type="text"
                        />

                        <Input
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            label="Email Address"
                            placeholder="example@gmail.com"
                            type="text"
                        />

                        <div className="col-span-2">
                            <Input
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                                label="Password"
                                placeholder="Min 8 characters required"
                                type="password"
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                        Sign Up
                    </button>

                    <p className="text-[13px] text-slate-800 text-center">
                        Already have an account?{" "}
                        <Link className="font-medium text-primary underline" to="/login">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Signup;
