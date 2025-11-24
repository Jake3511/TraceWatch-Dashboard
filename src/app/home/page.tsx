'use client'
import React from "react"
import Header from "@/app/components/Header"
import DashboardIntroCard from "@/app/components/dashboard";
import CheckAPIStatus from "@/app/components/CheckAPIStatus";
import GetAPILatency from "@/app/components/GetAPILatency";
import GetCPUUsage from "@/app/components/GetCPUUsage";

const Home: React.FC = () => {
    return (
        <>
            <Header />
            <DashboardIntroCard />
            <div className="grid grid-cols-3 gap-6">
                <CheckAPIStatus />
                <GetAPILatency />
                <GetCPUUsage />
            </div>
        </>
    );
};

export default Home;