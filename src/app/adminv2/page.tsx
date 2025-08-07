"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  BuildingOfficeIcon,
  ChartBarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

const AdminV2Dashboard = () => {
  const router = useRouter();

  // Stats data - you can replace this with real data from your API
  const stats = [
    {
      name: "อพาร์ตเมนต์ทั้งหมด",
      value: "12",
      icon: BuildingOfficeIcon,
      color: "bg-blue-500",
      href: "/adminv2/apartments",
    },
    {
      name: "รายได้ทั้งหมด",
      value: "฿45,000",
      icon: CurrencyDollarIcon,
      color: "bg-green-500",
      href: "#",
    },
    {
      name: "การจองที่ใช้งานอยู่",
      value: "8",
      icon: UsersIcon,
      color: "bg-purple-500",
      href: "#",
    },
    {
      name: "การเติบโตรายเดือน",
      value: "+12%",
      icon: ChartBarIcon,
      color: "bg-orange-500",
      href: "#",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">แดชบอร์ด</h1>
        <p className="text-gray-600 mt-1">ยินดีต้อนรับสู่ระบบจัดการ v2</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            onClick={() => stat.href !== "#" && router.push(stat.href)}
            className={`bg-white rounded-lg border border-gray-200 p-6 shadow-sm ${
              stat.href !== "#"
                ? "cursor-pointer hover:shadow-md transition-shadow"
                : ""
            }`}
          >
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-md`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          การดำเนินการด่วน
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => router.push("/adminv2/apartments/create")}
            className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
          >
            <BuildingOfficeIcon className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="font-medium text-gray-900">เพิ่มอพาร์ตเมนต์</h3>
            <p className="text-sm text-gray-600">
              เพิ่มอพาร์ตเมนต์ใหม่เข้าสู่ระบบ
            </p>
          </button>

          <button
            onClick={() => router.push("/adminv2/apartments")}
            className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
          >
            <ChartBarIcon className="h-8 w-8 text-green-500 mb-2" />
            <h3 className="font-medium text-gray-900">ดูอพาร์ตเมนต์ทั้งหมด</h3>
            <p className="text-sm text-gray-600">จัดการอพาร์ตเมนต์ที่มีอยู่</p>
          </button>

          <button
            onClick={() => router.push("/adminv2/utilities")}
            className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
          >
            <BoltIcon className="h-8 w-8 text-orange-500 mb-2" />
            <h3 className="font-medium text-gray-900">จัดการสาธารณูปโภค</h3>
            <p className="text-sm text-gray-600">
              ดูและจัดการข้อมูลสาธารณูปโภค
            </p>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <button
            onClick={() => router.push("/adminv2/utilities/create")}
            className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
          >
            <BoltIcon className="h-8 w-8 text-purple-500 mb-2" />
            <h3 className="font-medium text-gray-900">
              เพิ่มข้อมูลสาธารณูปโภค
            </h3>
            <p className="text-sm text-gray-600">
              เพิ่มข้อมูลการใช้สาธารณูปโภคใหม่
            </p>
          </button>

          <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 text-left opacity-50">
            <UsersIcon className="h-8 w-8 text-gray-400 mb-2" />
            <h3 className="font-medium text-gray-600">จัดการผู้ใช้</h3>
            <p className="text-sm text-gray-500">เร็วๆ นี้...</p>
          </div>

          <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 text-left opacity-50">
            <CurrencyDollarIcon className="h-8 w-8 text-gray-400 mb-2" />
            <h3 className="font-medium text-gray-600">จัดการการชำระเงิน</h3>
            <p className="text-sm text-gray-500">เร็วๆ นี้...</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          กิจกรรมล่าสุด
        </h2>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-full">
              <BuildingOfficeIcon className="h-4 w-4 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                เพิ่มอพาร์ตเมนต์ใหม่
              </p>
              <p className="text-xs text-gray-500">2 ชั่วโมงที่แล้ว</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-2 rounded-full">
              <CurrencyDollarIcon className="h-4 w-4 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                ได้รับการชำระเงิน
              </p>
              <p className="text-xs text-gray-500">5 ชั่วโมงที่แล้ว</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="bg-purple-100 p-2 rounded-full">
              <UsersIcon className="h-4 w-4 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                ยืนยันการจองใหม่
              </p>
              <p className="text-xs text-gray-500">1 วันที่แล้ว</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminV2Dashboard;
