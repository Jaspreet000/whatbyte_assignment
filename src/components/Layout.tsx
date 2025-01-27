"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#F7F8FA]">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static w-[220px] bg-white shadow-sm flex flex-col z-30 h-screen transform transition-transform duration-300 ease-in-out lg:transform-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-5 pb-[15px] border-b flex justify-between items-center bg-white">
          <div className="flex items-center">
            <span className="font-bold text-xl text-[#1E1E1E]">WhatBytes</span>
          </div>
          {/* Close button for mobile */}
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-2 bg-white flex-1">
          <ul className="space-y-1">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsSidebarOpen(false)}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
                <span className="text-[13px]">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/skill-test"
                className="flex items-center gap-3 p-3 bg-[#F7F8FA] text-[#4F67FF] rounded-md"
                onClick={() => setIsSidebarOpen(false)}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-[13px]">Skill Test</span>
              </Link>
            </li>
            <li>
              <Link
                href="/internship"
                className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsSidebarOpen(false)}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-[13px]">Internship</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <header className="h-16 bg-white border-b flex items-center px-4 lg:px-8">
          {/* Left side - Hamburger Menu Button */}
          <div className="flex-1 flex items-center">
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Right side - Profile */}
          <div className="flex items-center gap-3 border border-[#E5E7EB] px-4 py-1 rounded-lg">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src="/profile-pic.jpg"
                alt="Profile"
                width={32}
                height={30}
                className="object-cover"
              />
            </div>
            <span className="text-[12px] text-[#1E1E1E] font-bold whitespace-nowrap">
              Jaspreet Singh
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-2 pt-0 bg-[#F7F8FA]">{children}</main>
      </div>
    </div>
  );
}
