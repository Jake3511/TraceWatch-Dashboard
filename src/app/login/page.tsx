'use client'
import React, {useState} from "react"
import Header from "@/app/components/Header"
import LoginComponent from "../components/LoginComponent"
import SignUpComponent from "../components/SignUpComponent"

const Login: React.FC = () => {
    const [isRegistering, setIsRegistering] = useState<boolean | null>(null);
    const toggleForm = () => setIsRegistering((prev) => !prev);
    
    return (
    <>
        <div 
            className="relative h-screen w-screen">
           
            <Header />
            {isRegistering ? <SignUpComponent toggleForm={toggleForm} setIsRegistering={setIsRegistering} /> : <LoginComponent toggleForm={toggleForm} />}
        </div>
    </>
)}

export default Login;