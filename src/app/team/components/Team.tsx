"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { User } from "lucide-react";

interface TeamMember {
  $id: string;
  name: string;
  role: string;
  profilePic: string;
}
/* ghjkl */

const localTeam: TeamMember[] = [
  {
    $id: "local-1",
    name: "Amir Shahzad",
    role: "Founder | CEO",
    profilePic: "/Team/Amir-Shahzad.png",
  },
  {
    $id: "local-2",
    name: "Saad Abdullah",
    role: "Founder | CTO",
    profilePic: "/Team/Saad-Abdullah.png",
  },
  {
    $id: "local-3",
    name: "M. Talha Rashid",
    role: "Founder | COO",
    profilePic: "/Team/Talha-Rashid.png",
  },
  {
    $id: "local-4",
    name: "Salman Ahmed",
    role: "Senior AI Engineer",
    profilePic: "/Team/Salman-Ahmed.png",
  },
  {
    $id: "local-7",
    name: "Burhan Aslam",
    role: "Lead Gen Specialist",
    profilePic: "/Team/Burhan-Aslam.png",
  },
  // { 
   /*   Verxeon */
  //   $id: "local-5",
  //   name: "Qadeer Raza",
  //   role: "Senior Python Developer",
  //   profilePic: "/Team/Qadeer-Raza.png",
  // },
  {
    $id: "local-6",
    name: "Abdul Qudoos",
    role: "AI/ML Research Engineer",
    profilePic: "/Team/Abdul-Qudoos.png",
  },
 
];

// TeamCard Component
const TeamCard = ({ member }: { member: TeamMember }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative h-full">
      <div className="bg-white rounded-lg p-3 hover:scale-[1.01] transition-all duration-300 relative overflow-hidden h-full shadow-md">
        <div className="absolute inset-0 bg-gradient-to-br from-[#08273b]/5 via-transparent to-[#08273b]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="relative z-10 flex justify-center my-4">
          <div className="relative w-56 h-72">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[86%] h-4/5 bg-white border border-[#08273b]/20 shadow-lg rounded-2xl"></div>

            {!imageError && member.profilePic ? (
              <img
                src={member.profilePic}
                alt={member.name}
                className="relative z-10 w-full h-full object-contain rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="relative z-10 w-full h-full bg-gradient-to-br from-[#08273b] to-[#258a93] flex items-center justify-center rounded-2xl">
                <div className="text-center">
                  <User className="h-16 w-16 text-white mx-auto mb-2" />
                  <p className="text-white text-sm font-medium">
                    {member.name.split(" ")[0]}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10 text-center mb-4">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-1">
            {member.name}
          </h3>
          <p className="text-[#1a6b8f] font-medium text-base md:text-lg">
            {member.role}
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Team Component
const Team = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const intervalMs = 5000;

  // Create extended arrays for infinite scroll effect
  const extendedTeam = [...localTeam, ...localTeam, ...localTeam];

  // Auto-advance carousel
  const advanceSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  // Reset position when reaching cloned section
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex >= localTeam.length) {
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    timerRef.current = setInterval(advanceSlide, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [advanceSlide, intervalMs]);

  // Calculate active dots
  const getActiveDots = (visibleCount: number) => {
    const active = [];
    const baseIndex = currentIndex % localTeam.length;
    for (let i = 0; i < visibleCount; i++) {
      active.push((baseIndex + i) % localTeam.length);
    }
    return active;
  };

  return (
    <section id="team" className="py-24 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Experts Behind <span style={{ color: "#1a6b8f" }}>Verxeon</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Our team of{" "}
            <span className="text-[#08273b]">
              specialized engineers and industrial AI experts
            </span>{" "}
            brings deep expertise in{" "}
            <span className="text-[#08273b]">
              model optimization, edge deployment, and Industrial IoT
            </span>{" "}
            - transforming{" "}
            <span className="text-[#08273b]">
              complex AI into real-time intelligence for critical operations
            </span>
            .
          </p>
        </motion.div>

        {/* Mobile Carousel (1 card) */}
        <div className="block md:hidden mb-12">
          <div className="overflow-hidden">
            <div
              className={`flex gap-6 ${
                isTransitioning
                  ? "transition-transform duration-700 ease-in-out"
                  : ""
              }`}
              style={{
                transform: `translateX(calc(-${currentIndex * 100}% - ${
                  currentIndex * 1.5
                }rem))`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedTeam.map((member, i) => (
                <div key={`mobile-${i}`} className="w-full flex-shrink-0">
                  <TeamCard member={member} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center">
            <div className="px-6 py-3 rounded-full bg-white flex gap-3 border border-gray-200 shadow-lg">
              {localTeam.map((_, index) => {
                const activeDots = getActiveDots(1);
                const isActive = activeDots.includes(index);
                return (
                  <span
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      isActive ? "bg-[#08273b]" : "bg-gray-300"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Tablet Carousel (2 cards) */}
        <div className="hidden md:block lg:hidden mb-12">
          <div className="overflow-hidden">
            <div
              className={`flex gap-6 ${
                isTransitioning
                  ? "transition-transform duration-700 ease-in-out"
                  : ""
              }`}
              style={{
                transform: `translateX(calc(-${currentIndex * 50}% - ${
                  currentIndex * 1.5
                }rem))`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedTeam.map((member, i) => (
                <div key={`tablet-${i}`} className="w-1/2 flex-shrink-0">
                  <TeamCard member={member} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center">
            <div className="px-6 py-3 rounded-full bg-white flex gap-3 border border-gray-200 shadow-lg">
              {localTeam.map((_, index) => {
                const activeDots = getActiveDots(2);
                const isActive = activeDots.includes(index);
                return (
                  <span
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      isActive ? "bg-[#08273b]" : "bg-gray-300"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop Carousel (3 cards) */}
        <div className="hidden lg:block">
          <div className="overflow-hidden">
            <div
              className={`flex gap-8 ${
                isTransitioning
                  ? "transition-transform duration-700 ease-in-out"
                  : ""
              }`}
              style={{
                transform: `translateX(calc(-${currentIndex * 33.333}% - ${
                  currentIndex * 2.667
                }rem))`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedTeam.map((member, i) => (
                <div key={`desktop-${i}`} className="w-1/3 flex-shrink-0">
                  <TeamCard member={member} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center">
            <div className="px-6 py-3 rounded-full bg-white flex gap-3 border border-gray-200 shadow-lg">
              {localTeam.map((_, index) => {
                const activeDots = getActiveDots(3);
                const isActive = activeDots.includes(index);
                return (
                  <span
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      isActive ? "bg-[#08273b]" : "bg-gray-300"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
