'use client'
import React, {useState, useEffect} from 'react'

const DisplayApiKey: React.FC = () => {
    const [apiKey, setApiKey] = useState<string | null>(null);

    const handleApiKey = async () => {
        const res = await fetch('/api/auth/')
    }
    
    return (
    <>
        <h1>To return to login page, please copy and paste you're Api key to a secure location.</h1>
    </>
)}