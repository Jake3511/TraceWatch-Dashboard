import React from "react"
import CheckAPIStatus from "../components/CheckAPIStatus";
import GetAPILatency from "../components/GetAPILatency";
import GetCPUUsage from "../components/GetCPUUsage";

const Home: React.FC = () => {
    return (
    <>
        <h1 className="text-4xl text-red-500 font-bold">Tailwind is working!</h1>;
        <CheckAPIStatus />
        <GetAPILatency />
        <GetCPUUsage />
    </>
)}

export default Home;