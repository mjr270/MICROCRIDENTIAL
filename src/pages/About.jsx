import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaLaptopCode, FaUsers, FaGraduationCap } from "react-icons/fa";

const About = () => {
  const features = [
    { icon: <FaLaptopCode />, title: "Tech Focused", desc: "We provide cutting-edge learning and skill development resources." },
    { icon: <FaGraduationCap />, title: "Certified Learning", desc: "Get verified certificates for your skills and achievements." },
    { icon: <FaUsers />, title: "Community Driven", desc: "Connect with like-minded learners and professionals globally." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-6 bg-gray-50">
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">About MicroCred</h1>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            MicroCred is an innovative platform connecting learners, institutions, and employers. Our mission is to make learning accessible, measurable, and rewarding for everyone.
          </p>
        </section>

        <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 text-center">
              <div className="text-blue-600 text-4xl mb-4">{feature.icon}</div>
              <h2 className="text-2xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
