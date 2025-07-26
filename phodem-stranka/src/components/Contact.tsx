import React, { useState, useEffect } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Contact: React.FC = () => {
  const [currentDay, setCurrentDay] = useState("");
  
  const { elementRef: sectionRef } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    animationClass: 'animate-fade-in-scale'
  });

  useEffect(() => {
    const days = ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"];
    setCurrentDay(days[new Date().getDay()]);
  }, []);

  const businessHours = [
    { day: "Pondelok", hours: "10:00 - 21:00" },
    { day: "Utorok", hours: "10:00 - 21:00"},
    { day: "Streda", hours: "10:00 - 21:00" },
    { day: "Štvrtok", hours: "10:00 - 21:00" },
    { day: "Piatok", hours: "10:00 - 22:00" },
    { day: "Sobota", hours: "11:00 - 22:00" },
    { day: "Nedeľa", hours: "11:00 - 21:00" }
  ];

  const { elementRef: contactDetailsRef } = useScrollAnimation<HTMLDivElement>({
    // threshold: 0.2,
    // animationClass: 'animate-fade-in-scale',
  });

  const { elementRef: hoursRef } = useScrollAnimation<HTMLDivElement>({
    // threshold: 0.2,
    // animationClass: 'animate-fade-in-scale',
  });

  const { elementRef: mapRef } = useScrollAnimation<HTMLDivElement>({
    // threshold: 0.2,
    // animationClass: 'animate-fade-in-scale',
  });

    return (
        <section 
          id="contact" 
          className="bg-white dark:bg-black relative w-full min-h-screen flex items-center justify-center py-8 md:py-16 font-sans scroll-fade-in"
          ref={sectionRef}
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/contact-bg.png" 
                    alt="Contact Background" 
                    className="w-full h-full object-cover object-center"
                />
            </div>
            <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Details */}
          <div className="bg-yellow-200 p-10 rounded-lg shadow-lg" ref={contactDetailsRef}>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-6">Phố đêm</h2>
            
            <div className="space-y-4">
              <a
                href="tel:+421 908 039 280"
                className="flex items-center space-x-3 text-neutral-900 hover:text-neutral-700 transition-colors"
              >
                <FaPhone className="text-neutral-900" />
                <span className="font-medium">+421 908 039 280</span>
              </a>

              <a
                href="mailto:phodem23@centrum.sk"
                className="flex items-center space-x-3 text-neutral-900 hover:text-neutral-700 transition-colors"
              >
                <FaEnvelope className="text-neutral-900" />
                <span className="font-medium">phodem23@centrum.sk</span>
              </a>

              <div className="flex items-center space-x-3 text-neutral-900">
                <FaMapMarkerAlt className="text-neutral-900" />
                <span className="font-medium">Letná 1073/6 064 03 Stara lubovna, Slovakia</span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="bg-yellow-100 p-10 rounded-lg shadow-lg" ref={hoursRef}>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-6">Otváracie hodiny</h2>
            <div className="space-y-2">
              {businessHours.map((schedule) => (
                <div
                  key={schedule.day}
                  className={`flex justify-between items-center p-2 rounded ${
                    schedule.day === currentDay ? "bg-amber-200 bg-opacity-10" : ""
                  }`}
                >
                  <span className="font-medium text-neutral-900">{schedule.day}</span>
                  <span className="font-medium text-neutral-900">{schedule.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="bg-neutral-800 p-10 rounded-lg shadow-lg lg:col-span-1" ref={mapRef}>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">Kde nás nájdete</h2>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <iframe
                title="Restaurant Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2601.861977438683!2d20.678720376792388!3d49.297957669672044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473e13c51e8f8a87%3A0x5181772ce616c05c!2zUGjhu5EgxJHDqm0!5e0!3m2!1ssk!2ssk!4v1753540282942!5m2!1ssk!2ssk"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLIFrameElement;
                  const fallback = target.nextElementSibling as HTMLElement;
                  target.style.display = "none";
                  if (fallback) fallback.style.display = "block";
                }}
              ></iframe>
              <div
                className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-white"
                style={{ display: 'none' }}
                role="alert"
              >
                <p className="font-medium">Map loading failed. Please try again later.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
        </section>
    );
};

export default Contact;
