'use client'
import React, { useState, useEffect} from "react"

interface LoginComponentProps {
    toggleForm: () => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({toggleForm}) => {
    const [email, setEmail] = useState <string | null>(null)
    const [password, setPassword] = useState<string | null>(null)

    const handleLogin = async () => {
        const res = await fetch('/api/auth/read-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        console.log(email, password);
        
        const data = await res.json();
        console.log(data);

        if (res.ok) {
            alert("ALL GOOD");
            test();
        }
        else {
            alert(`Error: ${data.error?.message}`);
        }
    }

    const test = async () => {
        const res = await fetch('/api/store-user-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        });

        const data = res.json();
        console.log(data);
    }

    return (
        <>
            <div className="h-screen w-screen flex items-center justify-center">
                <div className="w-full max-w-[320px] md:max-w-[400px] p-4 border border-white rounded-lg bg-opacity-0 backdrop-blur-xs">
                    <h1 className="text-white text-center font-bold">Login</h1>
                    <div>
                        <p className="text-white mb-3 ml-1 text-sm">Email</p>
                        <input 
                            className="w-full px-3 py-2 mb-3 text-black bg-white rounded-md focus:outline-none font-medium border border-gray-300" 
                            placeholder="Email"
                            type="email"
                            value={email ?? ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            >
                            </input>
                            
                        <p className="text-white mb-3 ml-1 text-sm">Password</p>
                        <input 
                            className="w-full px-3 py-2 mb-3 text-black bg-white rounded-md focus:outline-none font-medium border border-gray-300" 
                            placeholder="Password"
                            type="password"
                            value={password ?? ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            >
                        </input>
                        <button className="w-full px-4 py-3 mt-4 text-sm font-semibold text-white bg-[#2F2F2F] rounded-md transition-transform 
                        duration-300 ease-in-out hover:scale-105 hover:bg-[#404040]" onClick={handleLogin}>
                            Login
                        </button>

                        <p className="my-3 text-center text-xs text-gray-400">- or -</p>

                        <button className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold bg-white text-black 
                            rounded-md transition-transform duration-300 ease-in-out hover:scale-105 border border-gray-300" 
                            onClick={toggleForm}>
                            Sign Up
                        </button>

                        <p className="mt-3 text-[10px] text-center text-white">
                            By continuing, you agree to TraceWatch&apos;s <br />
                            <span className="underline cursor-pointer">Terms of Service</span> and acknowledge you’ve read <br />
                            our <span className="underline cursor-pointer">Privacy Policy</span>. Notice at collection.
                        </p>

                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginComponent;