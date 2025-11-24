"use client";
import React, { useState } from "react"
import { useRouter } from "next/navigation";

interface SignUpComponentProps {
    toggleForm: () => void;
    setIsRegistering: React.Dispatch<React.SetStateAction<boolean | null>>
}

interface SignUpForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordCheck: string;
}

const SignUpComponent: React.FC<SignUpComponentProps> = ({ toggleForm }) => {
    const [error, setError] = useState<string | null>(null);

    // local form state for storing user input
    const [form, setForm] = useState<SignUpForm>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordCheck: "",
    });

    const router = useRouter();

    // Update a single field in the form when the user types
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        const field = name as keyof SignUpForm;

        setForm(prev => ({
            ...prev,
            [field]: value,
        }));
    }

    const handleSignUp = async () => {
        // quick check to make sure the two password fields match
        if (form.password !== form.passwordCheck) {
            alert("These passwords do not match!");
            return;
        }

        // send user details to the server to create the account
        const res = await fetch("../api/auth/create-user", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: form.email,
                password: form.password,
                firstName: form.firstName,
                lastName: form.lastName,
            }),
        });

        const data = await res.json();
        const apiKey = data.apiKey;

        // if everything went well, redirect the user to a page
        // that shows their generated API key
        if (res.ok) {
            router.push(`/display?apiKey=${encodeURIComponent(apiKey)}`);
        } else {
            // show an error message under the input if signup failed
            setError(data.error || "Invalid signup attempt");
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="w-full max-w-[320px] md:max-w-[400px] p-4 border border-slate-900 rounded-lg bg-opacity-0 backdrop-blur-xs">
                <h1 className="text-slate-900 text-center font-bold">Sign Up</h1>

                <div>
                    <p className="text-white mb-3 ml-1 text-sm">First Name</p>
                    <input 
                        className="w-full px-3 py-2 mb-3 text-black bg-white rounded-md border border-gray-300"
                        placeholder="First Name"
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                    />

                    <p className="text-white mb-3 ml-1 text-sm">Last Name</p>
                    <input 
                        className="w-full px-3 py-2 mb-3 text-black bg-white rounded-md border border-gray-300"
                        placeholder="Last Name"
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                    />

                    <p className="text-white mb-3 ml-1 text-sm">Email</p>
                    <input 
                        className="w-full px-3 py-2 mb-3 text-black bg-white rounded-md border border-gray-300"
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    {error && (
                        <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}

                    <p className="text-white mb-3 ml-1 text-sm">Password</p>
                    <input 
                        className="w-full px-3 py-2 mb-3 text-black bg-white rounded-md border border-gray-300"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <p className="text-white mb-3 ml-1 text-sm">Re-type Password</p>
                    <input 
                        className="w-full px-3 py-2 mb-3 text-black bg-white rounded-md border border-gray-300"
                        placeholder="Re-type Password"
                        type="password"
                        name="passwordCheck"
                        value={form.passwordCheck}
                        onChange={handleChange}
                    />

                    {/* Switch back to login form */}
                    <button 
                        className="w-full px-4 py-3 mt-4 text-sm font-semibold text-white bg-[#2F2F2F] rounded-md hover:scale-105 hover:bg-[#404040]"
                        onClick={toggleForm}
                    >
                        Login
                    </button>

                    <p className="my-3 text-center text-xs text-gray-400">- or -</p>

                    {/* Attempt to create the account */}
                    <button 
                        className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold bg-white text-black rounded-md hover:scale-105 border border-gray-300"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </button>

                    <p className="mt-3 text-[10px] text-center text-slate-900">
                        By continuing, you agree to TraceWatch&apos;s <br />
                        <span className="underline cursor-pointer">Terms of Service</span> and acknowledge you’ve read <br />
                        our <span className="underline cursor-pointer">Privacy Policy</span>. Notice at collection.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpComponent;
