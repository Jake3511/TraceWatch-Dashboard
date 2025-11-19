import React, { useState } from "react"

/*
    interface allows you to 
*/
interface SignUpComponentProps {
    toggleForm: () => void;
    setIsRegistering: React.Dispatch<React.SetStateAction<boolean | null>>
}

// function used for signing up via auth0 takes in the form and if the user is registring
const SignUpComponent: React.FC<SignUpComponentProps> = ({toggleForm, setIsRegistering}) => {
    // values used for creating a new user
    const [firstName, setFirstName] = useState <string | null>(null)
    const [lastName, setLastName] = useState <string | null>(null)
    const [email, setEmail] = useState <string | null>(null)
    const [password, setPassword] = useState <string | null>(null)
    const [password2, setPassword2] = useState <string | null>(null)

    const handleSignUp = async () => {

        // checks to see if passwords are equal and if not, send alert and return function
        if (password !== password2) { 
            alert("These passwords do not match!");
            return;
        }

        // this will make a post request to the next.js server which passes a json object containing the email, password, first name and last name of user
        const res = await fetch ("../api/auth/create-user", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                password,
                firstName,
                lastName,
            }),
        })
        
        // here, data will be intialized as the 
        const data = await res.json();

        if(res.ok) {
            storeUserInfo(data.user_id);
        }
        else {
            alert(`Error: ${data.error?.message || 'Signup failed'}`);
        }
    }

    const storeUserInfo = async (auth0id: string) => {
        const res = await fetch ("../api/store-user-info", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                auth0id,
                email,
                firstName,
                lastName
            })
        })
        
        const data = await res.json();

        if (res.ok) {
            alert("API KEY VALID");
            setIsRegistering(false)
        }

        else {
            alert(`Error: ${data.error?.message || 'Storing User info failed'}`)
        }
    }
    
    return (
        <>
            <div className="h-screen w-screen flex items-center justify-center">
                <div className="w-full max-w-[320px] md:max-w-[400px] p-4 border border-white rounded-lg bg-opacity-0 backdrop-blur-xs">
                    <h1 className="text-white text-center font-bold">Sign Up</h1>
                    <div>
                    <p className="text-white mb-3 ml-1 text-sm">First Name</p>
                        <input 
                            className="w-full px-3 py-2 mb-3 text-black bg-white rounded-md focus:outline-none font-medium border border-gray-300" 
                            placeholder="First Name"
                            type="name"
                            value={firstName ?? ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                            >
                            </input>
                            
                        <p className="text-white mb-3 ml-1 text-sm">Last Name</p>
                        <input 
                            className="w-full px-3 py-2 mb-3 text-black bg-white rounded-md focus:outline-none font-medium border border-gray-300" 
                            placeholder="Last Name"
                            type="name"
                            value={lastName ?? ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                            >
                        </input>
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
                        <p className="text-white mb-3 ml-1 text-sm">Re-type Password</p>
                        <input 
                            className="w-full px-3 py-2 mb-3 text-black bg-white rounded-md focus:outline-none font-medium border border-gray-300" 
                            placeholder="Re-type Password"
                            type="password"
                            value={password2 ?? ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword2(e.target.value)}
                            >
                        </input>
                        <button className="w-full px-4 py-3 mt-4 text-sm font-semibold text-white bg-[#2F2F2F] rounded-md transition-transform duration-300 ease-in-out 
                        hover:scale-105 hover:bg-[#404040]" onClick={toggleForm}>
                            Login
                        </button>

                        <p className="my-3 text-center text-xs text-gray-400">- or -</p>

                        <button className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold bg-white text-black 
                            rounded-md transition-transform duration-300 ease-in-out hover:scale-105 border border-gray-300" onClick={handleSignUp}>
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

export default SignUpComponent;