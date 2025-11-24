'use client'
import React from "react";

interface DisplayApiKeyProps {
  apiKey: string;
}

const DisplayApiKey: React.FC<DisplayApiKeyProps> = ({ apiKey }) => {
  return (
    <div className="p-4 border rounded-lg bg-white">
      <h1 className="font-semibold mb-2">
        To return to login page please copy and paste your API key to a secure location, and click the icon above.
      </h1>
      <p className="font-mono break-all bg-gray-100 p-2 rounded">
        {apiKey}
      </p>
    </div>
  );
};

export default DisplayApiKey;
