"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import useAdminUser from "@/api/user/useAdminUser";
import {
  PencilIcon,
  ArrowLeftIcon,
  CalendarIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  IdentificationIcon,
  KeyIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { Gender } from "@/enum/Gender";
import { UserRole } from "@/enum/UserRole";

const ViewUserPage = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const { data: user, isLoading, error } = useAdminUser(userId);

  useEffect(() => {
    if (error) {
      console.error("Failed to load user:", error);
      router.push("/adminv2/users");
    }
  }, [error, router]);

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const getGenderLabel = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return "ชาย";
      case Gender.Female:
        return "หญิง";
      case Gender.Other:
        return "อื่นๆ";
      default:
        return "ไม่ระบุ";
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "ผู้ดูแลระบบ";
      case UserRole.USER:
        return "ผู้ใช้";
      default:
        return "ไม่ระบุ";
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "bg-red-100 text-red-800";
      case UserRole.USER:
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEdit = () => {
    router.push(`/adminv2/users/edit/${userId}`);
  };

  const handleChangePassword = () => {
    router.push(`/adminv2/users/change-password/${userId}`);
  };

  const handleBack = () => {
    router.push("/adminv2/users");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="text-center text-red-600">
            <p>เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้: {error.message}</p>
            <button
              onClick={handleBack}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              กลับไปหน้ารายการ
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="text-center text-gray-500">
            <p>ไม่พบข้อมูลผู้ใช้</p>
            <button
              onClick={handleBack}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              กลับไปหน้ารายการ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleBack}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
              title="กลับ"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-gray-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <p className="text-gray-600 mt-1">รายละเอียดข้อมูลผู้ใช้</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleChangePassword}
              className="inline-flex items-center px-4 py-2 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <KeyIcon className="h-4 w-4 mr-2" />
              เปลี่ยนรหัสผ่าน
            </button>
            <button
              onClick={handleEdit}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              แก้ไข
            </button>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              ข้อมูลผู้ใช้
            </h2>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(
                user.role
              )}`}
            >
              {user.role === UserRole.ADMIN ? (
                <ShieldCheckIcon className="h-4 w-4 mr-1" />
              ) : (
                <UserIcon className="h-4 w-4 mr-1" />
              )}
              {getRoleLabel(user.role)}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <EnvelopeIcon className="h-4 w-4 mr-1" />
                  อีเมล
                </dt>
                <dd className="mt-1 text-sm text-gray-900 font-mono">
                  {user.email}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <PhoneIcon className="h-4 w-4 mr-1" />
                  เบอร์โทรศัพท์
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{user.telephone}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <IdentificationIcon className="h-4 w-4 mr-1" />
                  เพศ
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {getGenderLabel(user.gender)}
                </dd>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  อายุ
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{user.age} ปี</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  วันที่สมัครสมาชิก
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formatDate(user.createdAt)}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  วันที่อัปเดตล่าสุด
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formatDate(user.updatedAt)}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Management */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            การจัดการบัญชี
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleEdit}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <PencilIcon className="h-5 w-5 text-blue-600 mr-3" />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">
                  แก้ไขข้อมูลผู้ใช้
                </div>
                <div className="text-sm text-gray-500">
                  อัปเดตข้อมูลส่วนตัวและบทบาท
                </div>
              </div>
            </button>

            <button
              onClick={handleChangePassword}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <KeyIcon className="h-5 w-5 text-green-600 mr-3" />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">
                  เปลี่ยนรหัสผ่าน
                </div>
                <div className="text-sm text-gray-500">
                  กำหนดรหัสผ่านใหม่สำหรับผู้ใช้
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserPage;
