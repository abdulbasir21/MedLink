import Image from "next/image";
import Link from "next/link";
import { FaStethoscope, FaUserMd } from "react-icons/fa";
import doctors from "../../lib/doctors";

export default async function DoctorDetailPage({ params }) {
  const { id } = await params;
  const doctor = doctors.find((doc) => doc.id === Number(id));

  if (!doctor) {
    return <p className="text-center mt-20">Doctor not found</p>;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow p-8">
        <div className="rounded-xl overflow-hidden">
          <Image
            src={doctor.image}
            alt={doctor.name}
            width={500}
            height={500}
            className="object-cover object-top w-full h-full"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900">{doctor.name}</h1>

          <div className="flex items-center gap-2 text-blue-600 mt-3">
            <FaStethoscope />
            <span className="text-lg font-medium">{doctor.specialization}</span>
          </div>

          {doctor.experience && (
            <div className="flex items-center gap-2 text-gray-600 mt-2">
              <FaUserMd />
              <span>{doctor.experience}</span>
            </div>
          )}

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
            <p className="text-gray-600 leading-relaxed">{doctor.description}</p>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              href="/"
              className="inline-block text-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition"
            >
              Back
            </Link>

            <Link
              href="/appointment"
              className="inline-block text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
