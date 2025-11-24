import Image from "next/image";

const AboutCard = () => {
  return (
    <div className="w-full flex justify-center py-20">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-sm text-center border border-gray-200">

        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-purple-500">
            <Image
              src="/your-image.png" // replace later
              alt="Your face"
              width={200}
              height={200}
              className="object-cover"
            />
          </div>
        </div>

        {/* Name */}
        <h2 className="text-xl font-bold text-gray-800">Your Name</h2>

        {/* Subtitle */}
        <p className="text-gray-500 mt-1">Software Developer</p>

        {/* LinkedIn Button */}
        <div className="mt-6">
          <a
            href="#"
            className="inline-block bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            View LinkedIn
          </a>
        </div>

      </div>
    </div>
  );
};

export default AboutCard;
