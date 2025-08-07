"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  BuildingOfficeIcon,
  ChartBarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import useApartmentsV2 from "@/api/apartment/useApartmentsV2";
import useBookingsV2 from "@/api/booking/useBookingsV2";
import { useBillingsV2 } from "@/api/billing/useBillingsV2";
import { BookingStatus } from "@/enum/BookingStatus";
import { PaymentStatus } from "@/enum/PaymentStatus";

const AdminV2Dashboard = () => {
  const router = useRouter();

  // Fetch real data
  const {
    data: apartments = [],
    isLoading: apartmentsLoading,
    error: apartmentsError,
  } = useApartmentsV2();
  const {
    data: bookings = [],
    isLoading: bookingsLoading,
    error: bookingsError,
  } = useBookingsV2();
  const {
    data: billings = [],
    isLoading: billingsLoading,
    error: billingsError,
  } = useBillingsV2();

  // Calculate statistics from real data
  const stats = useMemo(() => {
    // Calculate total revenue from approved billings
    const totalRevenue = billings
      .filter((billing) => billing?.status === PaymentStatus.APPROVED)
      .reduce((sum, billing) => sum + (billing?.amount || 0), 0);

    // Calculate active bookings (approved and success status)
    const activeBookings = bookings.filter(
      (booking) =>
        booking?.status === BookingStatus.Approved ||
        booking?.status === BookingStatus.Success
    ).length;

    // Calculate growth (this would need historical data, using placeholder for now)
    const currentMonthRevenue = billings
      .filter((billing) => {
        if (!billing?.createdAt) return false;
        const billingDate = new Date(billing.createdAt);
        const currentDate = new Date();
        return (
          billingDate.getMonth() === currentDate.getMonth() &&
          billingDate.getFullYear() === currentDate.getFullYear() &&
          billing.status === PaymentStatus.APPROVED
        );
      })
      .reduce((sum, billing) => sum + (billing?.amount || 0), 0);

    const previousMonthRevenue = billings
      .filter((billing) => {
        if (!billing?.createdAt) return false;
        const billingDate = new Date(billing.createdAt);
        const currentDate = new Date();
        const previousMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1
        );
        return (
          billingDate.getMonth() === previousMonth.getMonth() &&
          billingDate.getFullYear() === previousMonth.getFullYear() &&
          billing.status === PaymentStatus.APPROVED
        );
      })
      .reduce((sum, billing) => sum + (billing?.amount || 0), 0);

    const growthPercentage =
      previousMonthRevenue > 0
        ? ((currentMonthRevenue - previousMonthRevenue) /
            previousMonthRevenue) *
          100
        : 0;

    return [];
  }, [
    apartments,
    bookings,
    billings,
    apartmentsLoading,
    bookingsLoading,
    billingsLoading,
    apartmentsError,
    bookingsError,
    billingsError,
  ]);

  // Helper function to format time ago
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60)
      );
      return `${diffInMinutes} นาทีที่แล้ว`;
    } else if (diffInHours < 24) {
      return `${diffInHours} ชั่วโมงที่แล้ว`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} วันที่แล้ว`;
    }
  };

  // Stats data - now using real data

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">แดชบอร์ด</h1>
        <p className="text-gray-600 mt-1">ยินดีต้อนรับสู่ระบบจัดการ v2</p>
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

          <button
            onClick={() => router.push("/adminv2/users")}
            className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
          >
            <UsersIcon className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="font-medium text-gray-900">จัดการผู้ใช้</h3>
            <p className="text-sm text-gray-600">
              จัดการข้อมูลและบทบาทของผู้ใช้ทั้งหมดในระบบ
            </p>
          </button>

          <button
            onClick={() => router.push("/adminv2/users")}
            className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
          >
            <CurrencyDollarIcon className="h-8 w-8 text-yellow-500 mb-2" />
            <h3 className="font-medium text-gray-900">จัดการการชำระเงิน</h3>
            <p className="text-sm text-gray-600">
              จัดการข้อมูลการชำระเงินและบิลต่างๆ
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminV2Dashboard;
