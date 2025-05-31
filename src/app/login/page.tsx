'use client'
import React, {useState, useRef} from "react"
import LoginComponent from "../components/LoginComponent"
import SignUpComponent from "../components/SignUpComponent"
import Image from 'next/image'
import background from "../assets/TraceWatch_Login.png"

const Login: React.FC = () => {
    const [isRegistering, setIsRegistering] = useState<boolean | null>(null);
    const toggleForm = () => setIsRegistering((prev) => !prev);
    return (
    <>
        <div 
            className="relative h-screen w-screen">
            <Image
                src={background}
                alt="Login background"
                fill
                priority
                className="object-cover -z-10"
            />
            <div className="absolute top-0 left-0 p-6">
                <h1 className="text-4xl text-red-500 font-bold">Tracewatch</h1>
            </div>
            {isRegistering ? <SignUpComponent toggleForm={toggleForm} /> : <LoginComponent toggleForm={toggleForm} />}
        </div>
    </>
)}

export default Login;