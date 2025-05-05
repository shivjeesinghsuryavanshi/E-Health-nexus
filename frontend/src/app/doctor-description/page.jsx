import Image from "next/image";

export default function DoctorDescription() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <img
              src="C:\Users\Saniya Srivastava\Desktop\Mern Stack\E-Health-nexus\frontend\public\doctor-character-background_1270-84.avif"
              alt="Dr. Rajesh Sharma"
              width={180}
              height={180}
              className="rounded-full border-4 border-teal-400"
            />
          </div>
          {/* Doctor Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dr. Rajesh Sharma</h1>
            <p className="text-lg text-gray-600 mb-1">MBBS, MD (General Medicine)</p>
            <p className="text-gray-500 mb-2">Senior Consultant - Internal Medicine</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-400 text-xl">★</span>
              <span className="font-medium text-gray-700">4.8</span>
              <span className="text-gray-400">(120 reviews)</span>
            </div>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Experience:</span> 15+ years
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Languages:</span> English, Hindi
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Location:</span> Apollo Hospital, Lucknow
            </p>
          </div>
        </div>
        {/* About Doctor */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-teal-600 mb-2">About</h2>
          <p className="text-gray-700 mb-4">
            Dr. Rajesh Sharma is a highly experienced physician specializing in internal medicine. He is known for his patient-centric approach and has helped thousands of patients manage chronic and acute illnesses. Dr. Sharma is committed to providing the best possible care using the latest medical advancements.
          </p>
          <h2 className="text-xl font-semibold text-teal-600 mb-2">Specializations</h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Diabetes Management</li>
            <li>Hypertension</li>
            <li>Thyroid Disorders</li>
            <li>General Health Checkups</li>
            <li>Infectious Diseases</li>
          </ul>
          <h2 className="text-xl font-semibold text-teal-600 mb-2">Consultation Fee</h2>
          <p className="text-gray-700 mb-6">₹500 per consultation</p>
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-md transition duration-300 text-lg">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}