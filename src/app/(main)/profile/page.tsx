"use client";

import useMyUserInfo from "@/api/user/useMyUserInfo";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { Gender } from "@/enum/Gender";
import { UserRole } from "@/enum/UserRole";
import {
  CalendarDaysIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function ProfilePage() {
  const { data: userInfo, isPending, error } = useMyUserInfo();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Profile
          </h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Profile Data
          </h2>
          <p className="text-gray-600">
            Unable to load your profile information.
          </p>
        </div>
      </div>
    );
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getGenderDisplay = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return "ชาย";
      case Gender.Female:
        return "หญิง";
      case Gender.Other:
        return "อื่น ๆ";
      default:
        return "ไม่ระบุ";
    }
  };

  const getRoleDisplay = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "ผู้ดูแลระบบ";
      case UserRole.USER:
        return "ผู้ใช้งาน";
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-blue-800 px-6 py-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <UserIcon className="w-10 h-10 text-gray-600" />
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold">{userInfo.name}</h1>
                <p className="text-blue-100 mt-1">{userInfo.email}</p>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(
                      userInfo.role
                    )}`}
                  >
                    <UsersIcon className="w-4 h-4 mr-1" />
                    {getRoleDisplay(userInfo.role)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            ข้อมูลส่วนตัว
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                ข้อมูลพื้นฐาน
              </h3>

              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">อีเมล</p>
                  <p className="text-gray-800">{userInfo.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    หมายเลขโทรศัพท์
                  </p>
                  <p className="text-gray-800">{userInfo.telephone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <UserIcon className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">เพศ</p>
                  <p className="text-gray-800">
                    {getGenderDisplay(userInfo.gender)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <CalendarDaysIcon className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">อายุ</p>
                  <p className="text-gray-800">{userInfo.age} ปี</p>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                ข้อมูลบัญชี
              </h3>

              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    รหัสผู้ใช้
                  </p>
                  <p className="text-gray-800 font-mono text-sm">
                    {userInfo.id}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <CalendarDaysIcon className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    วันที่สมัครสมาชิก
                  </p>
                  <p className="text-gray-800">
                    {formatDateTime(userInfo.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <CalendarDaysIcon className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    อัปเดตล่าสุด
                  </p>
                  <p className="text-gray-800">
                    {formatDateTime(userInfo.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setIsUpdateProfileOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                แก้ไขข้อมูล
              </button>
              <button
                onClick={() => setIsChangePasswordOpen(true)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                เปลี่ยนรหัสผ่าน
              </button>
            </div>
          </div>
        </div>

        {/* Update Profile Modal */}
        {userInfo && (
          <UpdateProfileForm
            isOpen={isUpdateProfileOpen}
            onClose={() => setIsUpdateProfileOpen(false)}
            currentUserInfo={userInfo}
          />
        )}

        {/* Change Password Modal */}
        <ChangePasswordForm
          isOpen={isChangePasswordOpen}
          onClose={() => setIsChangePasswordOpen(false)}
        />
      </div>
    </div>
  );
}
