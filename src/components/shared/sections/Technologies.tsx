'use client'

import { motion } from 'framer-motion'
import {
  SiPytorch,
  SiTensorflow,
  SiOpencv,
  SiDocker,
  SiKubernetes,
  SiGrafana,
  SiPrometheus,
  SiRedis,
  SiMqtt,
  SiRos,
  SiNvidia,
  SiRaspberrypi,
  SiArduino,
  SiC,
  SiPython,
  SiRust,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { TbBrandCpp } from "react-icons/tb";

type Tech = {
  name: string;
  icon: React.ReactNode;
  category: string;
  color: string;
};

const Technologies = () => {
  const techs_1: Tech[] = [
    {
      name: "TensorFlow Lite",
      icon: <SiTensorflow />,
      category: "Edge AI Framework",
      color: "#FF6F00",
    },
    {
      name: "PyTorch Mobile",
      icon: <SiPytorch />,
      category: "Edge AI Framework",
      color: "#EE4C2C",
    },
    {
      name: "ONNX Runtime",
      icon: <SiPytorch />,
      category: "Model Optimization",
      color: "#005CED",
    },
    {
      name: "OpenCV",
      icon: <SiOpencv />,
      category: "Computer Vision",
      color: "#5C3EE8",
    },
    {
      name: "NVIDIA Jetson",
      icon: <SiNvidia />,
      category: "Edge Hardware",
      color: "#76B900",
    },
    {
      name: "Raspberry Pi",
      icon: <SiRaspberrypi />,
      category: "Edge Hardware",
      color: "#A22846",
    },
    {
      name: "Arduino",
      icon: <SiArduino />,
      category: "IoT Hardware",
      color: "#00979D",
    },
    {
      name: "MQTT",
      icon: <SiMqtt />,
      category: "IoT Protocol",
      color: "#660066",
    },
    {
      name: "OPC-UA",
      icon: <SiRos />,
      category: "Industrial Protocol",
      color: "#22314E",
    },
  ];

  const techs_2: Tech[] = [
    {
      name: "Docker",
      icon: <SiDocker />,
      category: "Edge Containerization",
      color: "#2496ED",
    },
    {
      name: "Kubernetes",
      icon: <SiKubernetes />,
      category: "Edge Orchestration",
      color: "#326CE5",
    },
    {
      name: "Redis",
      icon: <SiRedis />,
      category: "Edge Cache",
      color: "#DC382D",
    },
    {
      name: "Grafana",
      icon: <SiGrafana />,
      category: "Monitoring",
      color: "#F46800",
    },
    {
      name: "Prometheus",
      icon: <SiPrometheus />,
      category: "Metrics & Alerts",
      color: "#E6522C",
    },
    {
      name: "AWS IoT",
      icon: <FaAws />,
      category: "Cloud Integration",
      color: "#FF9900",
    },
    {
      name: "Python",
      icon: <SiPython />,
      category: "AI Development",
      color: "#3776AB",
    },
    {
      name: "C++",
      icon: <TbBrandCpp />,
      category: "Performance",
      color: "#00599C",
    },
    {
      name: "Rust",
      icon: <SiRust />,
      category: "Systems Programming",
      color: "#000000",
    },
  ];

  const row1 = [...techs_1, ...techs_1, ...techs_1];
  const row2 = [...techs_2, ...techs_2, ...techs_2];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Technologies We <span style={{ color: "#1a6b8f" }}>Master</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            <span className="text-[#08273b]">Advanced edge computing</span> and{" "}
            <span className="text-[#08273b]">AI technologies</span> powering{" "}
            <span className="text-[#08273b]">
              real-time intelligence for point of action
            </span>
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Desktop/LG: horizontal marquee */}
          <div className="hidden sm:block space-y-12">
            {/* Top row: right -> left */}
            <div className="relative overflow-hidden">
              <div className="marquee-track marquee-top flex gap-8">
                {row1.map((tech, index) => (
                  <div
                    key={`${tech.name}-${index}`}
                    className="flex-none w-32 text-center group"
                  >
                    <div
                      className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center text-3xl"
                      style={{ color: tech.color }}
                    >
                      {tech.icon}
                    </div>
                    <h3 className="font-semibold text-card-primary mb-1">
                      {tech.name}
                    </h3>
                    <p className="text-xs text-[#1a6b8f]">{tech.category}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom row: left -> right */}
            <div className="relative overflow-hidden">
              <div className="marquee-track marquee-bottom marquee-reverse flex gap-8">
                {row2.map((tech, index) => (
                  <div
                    key={`${tech.name}-bottom-${index}`}
                    className="flex-none w-32 text-center group"
                  >
                    <div
                      className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center text-3xl"
                      style={{ color: tech.color }}
                    >
                      {tech.icon}
                    </div>
                    <h3 className="font-semibold text-card-primary mb-1">
                      {tech.name}
                    </h3>
                    <p className="text-xs text-[#1a6b8f]">{tech.category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile (xs): vertical marquee with same speed */}
          <div className="block sm:hidden">
            <div className="grid grid-cols-2 gap-6">
              {/* Left column: bottom -> top */}
              <div className="relative overflow-hidden">
                <div
                  className="marquee-track-vertical flex flex-col gap-6"
                  style={{ maxHeight: "85vh" }}
                >
                  {[...techs_1, ...techs_1, ...techs_1].map((tech, index) => (
                    <div
                      key={`m-left-${tech.name}-${index}`}
                      className="flex-none w-full text-center group"
                    >
                      <div
                        className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center text-2xl"
                        style={{ color: tech.color }}
                      >
                        {tech.icon}
                      </div>
                      <h3 className="font-semibold text-card-primary mb-0.5 text-sm">
                        {tech.name}
                      </h3>
                      <p className="text-[10px] text-[#1a6b8f]">
                        {tech.category}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column: top -> bottom */}
              <div className="relative overflow-hidden">
                <div
                  className="marquee-track-vertical marquee-reverse offset-third flex flex-col gap-6"
                  style={{
                    transform: "translateY(-33.3333%)",
                    maxHeight: "85vh",
                  }}
                >
                  {[...techs_2, ...techs_2, ...techs_2].map((tech, index) => (
                    <div
                      key={`m-right-${tech.name}-${index}`}
                      className="flex-none w-full text-center group"
                    >
                      <div
                        className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center text-2xl"
                        style={{ color: tech.color }}
                      >
                        {tech.icon}
                      </div>
                      <h3 className="font-semibold text-card-primary mb-0.5 text-sm">
                        {tech.name}
                      </h3>
                      <p className="text-[10px] text-[#1a6b8f]">
                        {tech.category}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Technologies