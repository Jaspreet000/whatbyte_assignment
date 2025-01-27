"use client";
import { useState } from "react";
import Image from "next/image";
import Layout from "@/components/Layout";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from "recharts";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(ArcElement, ChartTooltip);

interface TestScore {
  rank: number;
  percentile: number;
  correctAnswers: number;
  totalQuestions: number;
}

interface SyllabusScore {
  topic: string;
  percentage: number;
}

export default function SkillTestPage() {
  const [scores, setScores] = useState<TestScore>({
    rank: 4,
    percentile: 90,
    correctAnswers: 12,
    totalQuestions: 15,
  });

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const syllabusScores: SyllabusScore[] = [
    { topic: "HTML Tools, Forms, History", percentage: 80 },
    { topic: "Tags & References in HTML", percentage: 60 },
    { topic: "Tables & References in HTML", percentage: 24 },
    { topic: "Tables & CSS Basics", percentage: 96 },
  ];

  // Data for the comparison graph
  const generateGraphData = (percentile: number) => {
    // Base points for different percentile ranges
    const lowPercentilePoints = [
      { x: 0, value: 5, numberOfStudent: 2 },
      { x: 12, value: 8, numberOfStudent: 3 },
      { x: 25, value: 20, numberOfStudent: 3 },
      { x: 30, value: 35, numberOfStudent: 4 },
      { x: 35, value: 45, numberOfStudent: 4 },
      { x: 40, value: 55, numberOfStudent: 5 },
      { x: 45, value: 65, numberOfStudent: 4 },
      { x: 50, value: 100, numberOfStudent: 6 },
      { x: 55, value: 80, numberOfStudent: 5 },
      { x: 60, value: 60, numberOfStudent: 4 },
      { x: 70, value: 35, numberOfStudent: 3 },
      { x: 80, value: 20, numberOfStudent: 3 },
      { x: 90, value: 15, numberOfStudent: 4 },
      { x: 95, value: 10, numberOfStudent: 2 },
      { x: 100, value: 5, numberOfStudent: 2 },
    ];

    const highPercentilePoints = [
      { x: 0, value: 5, numberOfStudent: 2 },
      { x: 12, value: 8, numberOfStudent: 3 },
      { x: 25, value: 15, numberOfStudent: 3 },
      { x: 35, value: 25, numberOfStudent: 4 },
      { x: 45, value: 40, numberOfStudent: 4 },
      { x: 50, value: 100, numberOfStudent: 6 },
      { x: 55, value: 85, numberOfStudent: 5 },
      { x: 60, value: 65, numberOfStudent: 4 },
      { x: 70, value: 45, numberOfStudent: 3 },
      { x: 80, value: 30, numberOfStudent: 3 },
      { x: 90, value: 25, numberOfStudent: 4 },
      { x: 95, value: 15, numberOfStudent: 2 },
      { x: 100, value: 5, numberOfStudent: 2 },
    ];

    // Choose points based on percentile
    const basePoints =
      percentile > 50 ? highPercentilePoints : lowPercentilePoints;

    // Find the closest point to the percentile
    const exactPercentilePoint = basePoints.reduce((prev, curr) =>
      Math.abs(curr.x - percentile) < Math.abs(prev.x - percentile)
        ? curr
        : prev
    );

    return basePoints.map((point) => ({
      ...point,
      isPercentile: point.x === exactPercentilePoint.x,
    }));
  };

  // Update the donut chart configuration
  const donutChartData = {
    datasets: [
      {
        data: [
          scores.correctAnswers,
          scores.totalQuestions - scores.correctAnswers,
        ],
        backgroundColor: ["#4F67FF", "#EDF1FD"],
        borderWidth: 0,
        cutout: "85%",
        borderRadius: 20,
      },
    ],
    labels: ["Correct", "Incorrect"],
  };

  const donutOptions = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false,
    responsive: true,
    cutout: "85%",
    layout: {
      padding: 20,
    },
    elements: {
      arc: {
        borderRadius: 20,
      },
    },
  };

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto p-8">
        <div className="mb-4">
          <h1 className="text-[#6B7280] text-sm font-medium">Skill Test</h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section - Changes to top section on mobile */}
          <div className="w-full lg:w-[60%] space-y-4">
            {/* HTML Card */}
            <div className="bg-white rounded-lg p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex-shrink-0">
                    <Image
                      src="/html5-logo.png"
                      alt="HTML5 Logo"
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-[#1E1E1E] text-base font-semibold">
                      Hyper Text Markup Language
                    </h2>
                    <p className="text-xs text-[#9AA5B5] mt-1">
                      Questions: 08 | Duration: 15 mins | Submitted on 5 June
                      2021
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowUpdateModal(true)}
                  className="w-full sm:w-auto px-6 py-[10px] bg-[#142683] text-white rounded-md text-xs font-medium hover:bg-[#1D3392] transition-colors"
                >
                  Update
                </button>
              </div>
            </div>

            {/* Quick Statistics */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-[#1E1E1E] text-base font-semibold mb-6">
                Quick Statistics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
                <div className="flex items-center gap-3 sm:border-r border-[#E5E7EB] sm:pr-6">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="text-lg font-bold text-[#1E1E1E]">
                      {scores.rank}
                    </p>
                    <p className="text-[11px] text-[#9AA5B5] mt-1">YOUR RANK</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:border-r border-[#E5E7EB] sm:pr-6">
                  <span className="text-2xl">📋</span>
                  <div>
                    <p className="text-lg font-bold text-[#1E1E1E]">
                      {scores.percentile}%
                    </p>
                    <p className="text-[11px] text-[#9AA5B5] mt-1">
                      PERCENTILE
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl text-green-400">✓</span>
                  <div>
                    <p className="text-lg font-bold text-[#1E1E1E]">
                      {scores.correctAnswers}/{scores.totalQuestions}
                    </p>
                    <p className="text-[11px] text-[#9AA5B5] mt-1">
                      CORRECT ANSWERS
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Graph */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#1E1E1E] text-lg font-medium">
                  Comparison Graph
                </h3>
                <div className="w-10 h-10 bg-[#F7F8FA] rounded-full flex items-center justify-center">
                  <span>📈</span>
                </div>
              </div>
              <p className="text-sm text-[#6B7280] mb-6">
                <span className="font-bold">You scored {scores.percentile}% percentile </span> which is{" "}
                {scores.percentile > 72 ? "higher" : "lower"} than the average
                percentile 72% of all the engineers who took this assessment
              </p>
              <div className="h-[300px] relative bg-white">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={generateGraphData(scores.percentile)}
                    margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
                  >
                    <XAxis
                      dataKey="x"
                      type="number"
                      domain={[0, 100]}
                      ticks={[0, 25, 50, 75, 100]}
                      tick={{
                        fontSize: 12,
                        fill: "#6B7280",
                        dy: 10,
                      }}
                      axisLine={{ stroke: "#E5E7EB", strokeWidth: 1 }}
                      tickLine={false}
                    />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
                              <p className="text-sm font-medium">{data.x}</p>
                              <p className="text-xs text-[#6366F1]">
                                numberOfStudent : {data.numberOfStudent}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#6366F1"
                      strokeWidth={1.5}
                      fill="#FFFFFF"
                      isAnimationActive={true}
                      animationDuration={800}
                      animationBegin={0}
                      dot={(props: any) => {
                        const { cx, cy, payload } = props;
                        const isPercentilePoint = payload.isPercentile;
                        return (
                          <circle
                            key={`dot-${payload.x}`}
                            cx={cx}
                            cy={cy}
                            r={3}
                            stroke="#6366F1"
                            strokeWidth={1}
                            fill={isPercentilePoint ? "#6366F1" : "#FFFFFF"}
                          />
                        );
                      }}
                    />
                    <ReferenceLine
                      x={scores.percentile}
                      stroke="#6366F1"
                      strokeDasharray="3 3"
                      label={{
                        value: "your percentile",
                        position: "left",
                        fill: "#6B7280",
                        fontSize: 12,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Section - Changes to bottom section on mobile */}
          <div className="w-full lg:w-[40%] space-y-4">
            {/* Syllabus Analysis */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-[#1E1E1E] text-sm font-bold mb-6">
                Syllabus Wise Analysis
              </h3>
              <div className="space-y-4">
                {syllabusScores.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-[#6B7280] mb-2">
                        {item.topic}
                      </span>
                      <span
                        className={`text-sm font-bold ${
                          item.percentage >= 80
                            ? "text-[#438AF6]"
                            : item.percentage >= 60
                            ? "text-[#FF9142]"
                            : "text-[#FB5E5E]"
                        }`}
                      >
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-[#F7F8FA] rounded-full h-2 mb-8">
                      <div
                        className={`h-2 rounded-full ${
                          item.percentage >= 80
                            ? "bg-[#438AF6]"
                            : item.percentage >= 60
                            ? "bg-[#FF9142]"
                            : "bg-[#FB5E5E]"
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Question Analysis */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#1E1E1E] text-lg font-medium">
                  Question Analysis
                </h3>
                <span className="text-[#4F67FF] font-bold">
                  {scores.correctAnswers}/{scores.totalQuestions}
                </span>
              </div>
              <p className="text-sm text-[#6B7280] mb-8">
                <span className="font-bold">You scored {scores.correctAnswers} questions correct out of{" "}
                {scores.totalQuestions}.</span> However it still needs some
                improvements
              </p>
              <div className="relative h-[200px] w-[200px] mx-auto">
                <Doughnut data={donutChartData} options={donutOptions} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8">
                    <Image
                      src="/target.png"
                      alt="Target"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Update Modal */}
        {showUpdateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-[384px]">
              <h3 className="text-lg font-medium text-[#1E1E1E] mb-4">
                Update scores
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  setScores({
                    rank: Number(formData.get("rank")),
                    percentile: Number(formData.get("percentile")),
                    correctAnswers: Number(formData.get("score")),
                    totalQuestions: 15,
                  });
                  setShowUpdateModal(false);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm text-[#1E1E1E] mb-1">
                    Update your Rank
                  </label>
                  <input
                    type="number"
                    name="rank"
                    min="1"
                    max="100"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm text-[#1E1E1E]"
                    defaultValue={scores.rank}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#1E1E1E] mb-1">
                    Update your Percentile
                  </label>
                  <input
                    type="number"
                    name="percentile"
                    min="0"
                    max="100"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm text-[#1E1E1E]"
                    defaultValue={scores.percentile}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#1E1E1E] mb-1">
                    Update your Current Score (out of 15)
                  </label>
                  <input
                    type="number"
                    name="score"
                    min="0"
                    max="15"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm text-[#1E1E1E]"
                    defaultValue={scores.correctAnswers}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowUpdateModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-[#1E1E1E]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#142683] text-white rounded-md text-sm font-medium"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
