import React from "react";

interface MetricCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, children, className }) => {
  return (
    <div className={`p-6 rounded-2xl shadow-lg bg-white border border-gray-200 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-700 mb-3">{title}</h2>
      <div className="text-3xl font-bold text-indigo-600">
        {children}
      </div>
    </div>
  );
};

export default MetricCard;
