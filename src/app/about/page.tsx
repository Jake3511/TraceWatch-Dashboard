'use client'
import Header from "@/app/components/Header"
import Image from "next/image";

export default function AboutPage() {
    return (
      <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-sm text-center border border-gray-200">
          
          {/* Profile Image Placeholder */}
          <Image
            src="/Jake_Shick_LinkedIn_Photo.jpeg"
            alt="Jake Shick"
            width={128}
            height={128}
            className="rounded-full mx-auto mb-4"
          />
  
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Jake Shick</h1>
          <p className="text-gray-500 mb-4">Creator of TraceWatch • Full-Stack Developer</p>
  
          <a
            href="https://www.linkedin.com/in/jakeshick/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-medium transition"
          >
            Visit my LinkedIn
          </a>
        </div>
      </div>
      </>
    );
  }
  