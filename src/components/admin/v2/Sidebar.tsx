"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  HomeIcon,
  BuildingOfficeIcon,
  KeyIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [apartmentMenuOpen, setApartmentMenuOpen] = useState(true);
  const [roomMenuOpen, setRoomMenuOpen] = useState(true);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">ระบบจัดการ v2</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-5 px-2">
          <ul className="space-y-1">
            {/* Dashboard */}
            <li>
              <Link
                href="/adminv2"
                className={`${
                  isActive("/adminv2")
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                } group flex items-center px-2 py-2 text-sm font-medium border-l-4 rounded-r-md`}
              >
                <HomeIcon className="mr-3 h-5 w-5" />
                แดชบอร์ด
              </Link>
            </li>

            {/* Apartments */}
            <li>
              <button
                onClick={() => setApartmentMenuOpen(!apartmentMenuOpen)}
                className={`${
                  pathname.startsWith("/adminv2/apartments")
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                } group flex items-center w-full px-2 py-2 text-sm font-medium border-l-4 rounded-r-md`}
              >
                <BuildingOfficeIcon className="mr-3 h-5 w-5" />
                อพาร์ตเมนต์
                {apartmentMenuOpen ? (
                  <ChevronDownIcon className="ml-auto h-4 w-4" />
                ) : (
                  <ChevronRightIcon className="ml-auto h-4 w-4" />
                )}
              </button>

              {apartmentMenuOpen && (
                <ul className="mt-1 space-y-1">
                  <li>
                    <Link
                      href="/adminv2/apartments"
                      className={`${
                        isActive("/adminv2/apartments")
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      } group flex items-center pl-11 pr-2 py-2 text-sm font-medium`}
                    >
                      อพาร์ตเมนต์ทั้งหมด
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/adminv2/apartments/create"
                      className={`${
                        isActive("/adminv2/apartments/create")
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      } group flex items-center pl-11 pr-2 py-2 text-sm font-medium`}
                    >
                      เพิ่มอพาร์ตเมนต์
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Rooms */}
            <li>
              <button
                onClick={() => setRoomMenuOpen(!roomMenuOpen)}
                className={`${
                  pathname.startsWith("/adminv2/rooms")
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                } group flex items-center w-full px-2 py-2 text-sm font-medium border-l-4 rounded-r-md`}
              >
                <KeyIcon className="mr-3 h-5 w-5" />
                ห้องพัก
                {roomMenuOpen ? (
                  <ChevronDownIcon className="ml-auto h-4 w-4" />
                ) : (
                  <ChevronRightIcon className="ml-auto h-4 w-4" />
                )}
              </button>

              {roomMenuOpen && (
                <ul className="mt-1 space-y-1">
                  <li>
                    <Link
                      href="/adminv2/rooms"
                      className={`${
                        isActive("/adminv2/rooms")
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      } group flex items-center pl-11 pr-2 py-2 text-sm font-medium`}
                    >
                      ห้องพักทั้งหมด
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/adminv2/rooms/create"
                      className={`${
                        isActive("/adminv2/rooms/create")
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      } group flex items-center pl-11 pr-2 py-2 text-sm font-medium`}
                    >
                      เพิ่มห้องพัก
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                ยินดีต้อนรับสู่ระบบจัดการ v2
              </span>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
