'use client'

import Header from "@/app/components/Header";
import DisplayApiKey from "../components/DisplayApiKey";
import { useSearchParams } from "next/navigation";

const Display: React.FC = () => {
  const params = useSearchParams();
  const apiKey = params.get("apiKey") ?? "";

  return (
    <>
      <Header />

      <div className="mt-6 flex justify-center">
        <DisplayApiKey apiKey={apiKey} />
      </div>
    </>
  );
};

export default Display;
