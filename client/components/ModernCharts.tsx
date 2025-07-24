import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TrendingUp,
  PieChart as PieChartIcon,
  BarChart3,
  Activity,
  ChevronDown,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface LineChartProps {
  title: string;
  value: string;
  change: string;
  data: number[];
  color: string;
}

function LineChart({ title, value, change, data, color }: LineChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    value: string;
    month: string;
  }>({ show: false, x: 0, y: 0, value: "", month: "" });

  const periods = ["Monthly", "Weekly", "Daily", "Yearly"];
  const dateRanges = {
    Monthly: ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"],
    Weekly: ["W1", "W2", "W3", "W4", "W5", "W6"],
    Daily: ["MON", "TUE", "WED", "THU", "FRI", "SAT"],
    Yearly: ["2019", "2020", "2021", "2022", "2023", "2024"],
  };
  const months = dateRanges[selectedPeriod];

  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          transformOrigin: "center center",
          stagger: {
            amount: 0.8,
            from: "random",
          },
          scrollTrigger: {
            trigger: chartRef.current,
            start: "top 80%",
          },
        },
      );

      const path = chartRef.current.querySelector("[data-line-path]");
      if (path) {
        const pathLength = (path as SVGPathElement).getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: pathLength, strokeDashoffset: pathLength },
          {
            strokeDashoffset: 0,
            duration: 3,
            ease: "elastic.out(1, 0.75)",
            transformOrigin: "left center",
            delay: 0.5,
          },
        );
      }
    }
  }, []);

  const createSmoothPath = (data: number[]) => {
    const width = 800;
    const height = 120;
    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - (point / Math.max(...data)) * (height - 20) + 10;
      return { x, y };
    });

    if (points.length < 2) return "";

    let path = `M ${points[0].x},${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];

      const cp1x = prev.x + (curr.x - prev.x) / 3;
      const cp1y = prev.y;
      const cp2x = curr.x - (curr.x - prev.x) / 3;
      const cp2y = curr.y;

      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
    }

    return path;
  };

  return (
    <div
      ref={chartRef}
      className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transform hover:scale-[1.02] hover:rotate-[0.5deg] transition-all duration-500 ease-out w-full backdrop-blur-sm"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1 transition-colors duration-300">
            {value}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm transition-colors duration-300">
            {title}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-green-500 text-sm font-medium">{change}</span>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <span>{selectedPeriod}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${showDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-10 min-w-[120px]">
                {periods.map((period) => (
                  <button
                    key={period}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setShowDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      selectedPeriod === period
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative h-32 mb-4">
        <svg
          viewBox="0 0 800 120"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="purpleGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect
            width="800"
            height="120"
            className="fill-white dark:fill-gray-900 transition-all duration-500"
          />

          {(() => {
            const purpleData = [25, 15, 35, 20, 45, 35];
            const purplePath = createSmoothPath(purpleData);
            const purpleAreaPath = `${purplePath} L 280,70 L 0,70 Z`;

            return (
              <g>
                <path d={purpleAreaPath} fill="url(#purpleGradient)" />
                <path
                  d={purplePath}
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  data-line-path
                />
                <circle
                  cx="140"
                  cy="25"
                  r="3"
                  fill="white"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                />

                {purpleData.map((point, index) => {
                  const x = (index / (purpleData.length - 1)) * 280;
                  const y =
                    80 - (point / Math.max(...purpleData)) * (80 - 20) + 10;
                  return (
                    <circle
                      key={`purple-${index}`}
                      cx={x}
                      cy={y}
                      r="8"
                      fill="transparent"
                      className="cursor-pointer hover:fill-purple-100"
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltip({
                          show: true,
                          x: rect.left + rect.width / 2,
                          y: rect.top - 10,
                          value: `$${point}K`,
                          month: months[index],
                        });
                      }}
                      onMouseLeave={() =>
                        setTooltip({ ...tooltip, show: false })
                      }
                    />
                  );
                })}
              </g>
            );
          })()}

          {(() => {
            const cyanData = [30, 25, 20, 30, 25, 20];
            const cyanPath = createSmoothPath(cyanData);
            const cyanAreaPath = `${cyanPath} L 280,70 L 0,70 Z`;

            return (
              <g>
                <path d={cyanAreaPath} fill="url(#cyanGradient)" />
                <path
                  d={cyanPath}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  data-line-path
                />

                {cyanData.map((point, index) => {
                  const x = (index / (cyanData.length - 1)) * 280;
                  const y =
                    80 - (point / Math.max(...cyanData)) * (80 - 20) + 10;
                  return (
                    <circle
                      key={`cyan-${index}`}
                      cx={x}
                      cy={y}
                      r="8"
                      fill="transparent"
                      className="cursor-pointer hover:fill-cyan-100"
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltip({
                          show: true,
                          x: rect.left + rect.width / 2,
                          y: rect.top - 10,
                          value: `$${point}K`,
                          month: months[index],
                        });
                      }}
                      onMouseLeave={() =>
                        setTooltip({ ...tooltip, show: false })
                      }
                    />
                  );
                })}
              </g>
            );
          })()}
        </svg>

        {tooltip.show && (
          <div
            className="fixed z-50 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm pointer-events-none transform -translate-x-1/2 -translate-y-full"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <div className="font-semibold">{tooltip.value}</div>
            <div className="text-xs opacity-75">{tooltip.month}</div>
          </div>
        )}
      </div>

      <div className="flex justify-between text-xs text-gray-400 mt-2">
        {["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"].map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </div>
  );
}

interface PieChartProps {
  title: string;
  data: { label: string; value: number; color: string }[];
}

function PieChartComponent({ title, data }: PieChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    label: string;
    value: string;
  }>({ show: false, x: 0, y: 0, label: "", value: "" });

  const periods = ["Monthly", "Weekly", "Daily", "Yearly"];

  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          transformOrigin: "center center",
          stagger: {
            amount: 0.8,
            from: "random",
          },
          scrollTrigger: {
            trigger: chartRef.current,
            start: "top 80%",
          },
        },
      );

      const segments = chartRef.current.querySelectorAll("[data-pie-segment]");
      segments.forEach((segment, index) => {
        gsap.fromTo(
          segment,
          { strokeDasharray: "0 628" },
          {
            strokeDasharray: `${data[index].value * 6.28} 628`,
            duration: 1.5,
            ease: "power2.out",
            delay: index * 0.2,
          },
        );
      });
    }
  }, [data]);

  return (
    <div
      ref={chartRef}
      className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transform hover:scale-[1.02] hover:rotate-[0.5deg] transition-all duration-500 ease-out w-full backdrop-blur-sm"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
            {title}
          </h3>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <span>{selectedPeriod}</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showDropdown ? "rotate-180" : ""}`}
            />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-10 min-w-[120px]">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => {
                    setSelectedPeriod(period);
                    setShowDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedPeriod === period
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full transform -rotate-90"
          >

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#e5e7eb"
              strokeWidth="12"
            />

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#6366f1"
              strokeWidth="12"
              strokeDasharray="158 251"
              strokeDashoffset="0"
              data-pie-segment
              className="cursor-pointer hover:stroke-indigo-400 transition-colors"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setHoveredSegment(0);
                setTooltip({
                  show: true,
                  x: rect.left + rect.width / 2,
                  y: rect.top + rect.height / 2,
                  label: "Your files",
                  value: "63%",
                });
              }}
              onMouseLeave={() => {
                setHoveredSegment(null);
                setTooltip({ ...tooltip, show: false });
              }}
            />

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#06b6d4"
              strokeWidth="12"
              strokeDasharray="63 251"
              strokeDashoffset="-158"
              data-pie-segment
              className="cursor-pointer hover:stroke-cyan-400 transition-colors"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setHoveredSegment(1);
                setTooltip({
                  show: true,
                  x: rect.left + rect.width / 2,
                  y: rect.top + rect.height / 2,
                  label: "System",
                  value: "25%",
                });
              }}
              onMouseLeave={() => {
                setHoveredSegment(null);
                setTooltip({ ...tooltip, show: false });
              }}
            />
          </svg>
        </div>
      </div>

      <div className="space-y-3">
        <div
          className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
            hoveredSegment === 0
              ? "bg-indigo-50 dark:bg-indigo-900/20"
              : "hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
          onMouseEnter={() => setHoveredSegment(0)}
          onMouseLeave={() => setHoveredSegment(null)}
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Your files
            </span>
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            63%
          </span>
        </div>
        <div
          className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
            hoveredSegment === 1
              ? "bg-cyan-50 dark:bg-cyan-900/20"
              : "hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
          onMouseEnter={() => setHoveredSegment(1)}
          onMouseLeave={() => setHoveredSegment(null)}
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              System
            </span>
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            25%
          </span>
        </div>
      </div>

      {tooltip.show && (
        <div
          className="fixed z-50 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="font-semibold">{tooltip.label}</div>
          <div className="text-xs opacity-75">{tooltip.value}</div>
        </div>
      )}
    </div>
  );
}

interface BarChartProps {
  title: string;
  value: string;
  subtitle: string;
  change: string;
  data: number[];
}

function BarChart({ title, value, subtitle, change, data }: BarChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    value: string;
    day: string;
  }>({ show: false, x: 0, y: 0, value: "", day: "" });

  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          transformOrigin: "center center",
          stagger: {
            amount: 0.8,
            from: "random",
          },
          scrollTrigger: {
            trigger: chartRef.current,
            start: "top 80%",
          },
        },
      );

      const bars = chartRef.current.querySelectorAll("[data-bar]");
      bars.forEach((bar, index) => {
        gsap.fromTo(
          bar,
          { height: 0 },
          {
            height: `${(data[index] / Math.max(...data)) * 100}%`,
            duration: 1,
            ease: "power2.out",
            delay: index * 0.1,
          },
        );
      });
    }
  }, [data]);

  return (
    <div
      ref={chartRef}
      className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transform hover:scale-[1.02] hover:rotate-[0.5deg] transition-all duration-500 ease-out w-full backdrop-blur-sm"
    >
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </h3>
          <span className="text-green-500 text-sm font-medium">{change}</span>
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
          {value}
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">
          {subtitle}
        </p>
      </div>

      <div className="flex items-end justify-between h-32 space-x-3">
        {data.map((barValue, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setHoveredBar(index);
              setTooltip({
                show: true,
                x: rect.left + rect.width / 2,
                y: rect.top - 10,
                value: `${Math.round(barValue * 43)} visitors`,
                day: String(index + 1).padStart(2, "0"),
              });
            }}
            onMouseLeave={() => {
              setHoveredBar(null);
              setTooltip({ ...tooltip, show: false });
            }}
          >
            <div
              className="w-6 bg-gray-100 dark:bg-gray-700 rounded-full relative overflow-hidden"
              style={{ height: "120px" }}
            >
              <div
                className={`w-full rounded-full transition-all duration-300 absolute bottom-0 ${
                  hoveredBar === index
                    ? "bg-blue-600 dark:bg-blue-400"
                    : "bg-blue-500 dark:bg-blue-500"
                }`}
                data-bar
                style={{ height: 0 }}
              />
            </div>
            <span
              className={`text-xs mt-2 transition-colors ${
                hoveredBar === index
                  ? "text-blue-600 font-medium"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>

      {tooltip.show && (
        <div
          className="fixed z-50 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="font-semibold">{tooltip.value}</div>
          <div className="text-xs opacity-75">Day {tooltip.day}</div>
        </div>
      )}
    </div>
  );
}

interface CircularProgressProps {
  title: string;
  subtitle: string;
  percentage: number;
  value: string;
  subValue: string;
}

function CircularProgress({
  title,
  subtitle,
  percentage,
  value,
  subValue,
}: CircularProgressProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
  }>({ show: false, x: 0, y: 0 });

  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          transformOrigin: "center center",
          stagger: {
            amount: 0.8,
            from: "random",
          },
          scrollTrigger: {
            trigger: chartRef.current,
            start: "top 80%",
            onEnter: () => {
              gsap.to(
                { value: 0 },
                {
                  value: percentage,
                  duration: 2,
                  ease: "power2.out",
                  onUpdate: function () {
                    setCurrentPercentage(Math.round(this.targets()[0].value));
                  },
                },
              );
            },
          },
        },
      );
    }
  }, [percentage]);

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset =
    circumference - (currentPercentage / 100) * circumference;

  return (
    <div
      ref={chartRef}
      className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transform hover:scale-[1.02] hover:rotate-[0.5deg] transition-all duration-500 ease-out w-full backdrop-blur-sm"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div
          className="relative w-32 h-32 cursor-pointer"
          onMouseEnter={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setIsHovered(true);
            setTooltip({
              show: true,
              x: rect.left + rect.width / 2,
              y: rect.top - 10,
            });
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setTooltip({ ...tooltip, show: false });
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full transform -rotate-90"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke={isHovered ? "#2563eb" : "#3b82f6"}
              strokeWidth={isHovered ? "10" : "8"}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div
                className={`text-2xl font-bold transition-colors ${
                  isHovered
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {currentPercentage}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {tooltip.show && (
        <div
          className="fixed z-50 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="font-semibold">Profit Progress</div>
          <div className="text-xs opacity-75">
            {currentPercentage}% Complete
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {value}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Generation
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {subValue}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Revenue
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModernCharts() {
  const revenueData = [25, 20, 35, 30, 45, 40];
  const pieData = [
    { label: "Your files", value: 63, color: "#6366f1" },
    { label: "System", value: 25, color: "#06b6d4" },
  ];
  const trafficData = [40, 20, 60, 45, 80, 70, 30];
  const projectData = [30, 25, 40, 35, 50, 45];

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Real-Time Analytics Dashboard
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
            Monitor your verification performance with interactive charts and
            live data insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <LineChart
              title="Overall Revenue"
              value="$37.5K"
              change="↗ 34.5%"
              data={revenueData}
              color="#8b5cf6"
            />
          </div>
          <PieChartComponent title="Your Pie Chart" data={pieData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <BarChart
            title="Daily traffic"
            value="2,579"
            subtitle="Visitors"
            change="↗ 2.45%"
            data={trafficData}
          />

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                  Project status
                </h3>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-indigo-500 rounded"></div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      eCommerce
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      UI Design
                    </div>
                  </div>
                  <div className="ml-auto text-2xl font-bold text-gray-900 dark:text-white">
                    71%
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <div className="w-1 h-1 bg-current rounded-full mb-1"></div>
                <div className="w-1 h-1 bg-current rounded-full mb-1"></div>
                <div className="w-1 h-1 bg-current rounded-full"></div>
              </button>
            </div>

            <div className="h-20 mb-4">
              <svg viewBox="0 0 200 60" className="w-full h-full">
                <path
                  d="M 10,40 Q 30,30 50,35 T 90,25 T 130,30 T 170,20 T 190,25"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="50"
                  cy="35"
                  r="3"
                  fill="white"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div className="flex justify-between text-xs text-gray-400">
              {["Sat", "Sun", "Mon", "Tue", "Wed", "Thr", "Fri"].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
          </div>

          <CircularProgress
            title="Profit Estimation"
            subtitle="Discover your profit and learn more about your business"
            percentage={68}
            value="1540"
            subValue="$3,984"
          />
        </div>
      </div>
    </section>
  );
}
