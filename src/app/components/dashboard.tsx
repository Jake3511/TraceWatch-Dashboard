'use client'
import React from "react";

const DashboardIntroCard: React.FC = () => {
  return (
    <section className="w-full border-b border-gray-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2">
            Metrics Overview
          </h1>
          <p className="text-sm md:text-base text-slate-200 mb-4">
            This dashboard shows live telemetry sent from your applications using the TraceWatch SDK.
            Use these panels to monitor API health, latency, and resource usage in real time.
          </p>
          <div className="flex flex-wrap gap-4 text-xs md:text-sm text-slate-100">
            <span className="inline-flex items-center rounded-full border border-white/20 px-3 py-1">
              • API status & uptime at a glance
            </span>
            <span className="inline-flex items-center rounded-full border border-white/20 px-3 py-1">
              • CPU usage across your services
            </span>
            <span className="inline-flex items-center rounded-full border border-white/20 px-3 py-1">
              • Request latency & performance trends
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardIntroCard;