import React, {useState} from 'react';
import AuthLayout from "../../components/layouts/AuthLayout.jsx";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input.jsx";
import {validateEmail} from "../../utils/helpers.js";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector.jsx";

const Signup = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {

    }
    return (
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 flex flex-col justify-center ">
                <h3 className="text-xl font-semibold text-black">Create an account</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Join us today by entering your details below
                </p>
                <form onSubmit={handleSignup}>
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                          value={fullName}
                          onChange={({ target }) => setFullName(target.value)}
                          label="Full name"
                          placeholder="Your full name"
                          type="text"
                          />

                        <Input
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            label="Email Address"
                            placeholder="durangi@gmail.com"
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
                </form>
            </div>
        </AuthLayout>
    )
}
export default Signup;