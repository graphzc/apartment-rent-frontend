"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/interface/User";
import { Gender } from "@/enum/Gender";
import { UserRole } from "@/enum/UserRole";
import {
  PencilIcon,
  EyeIcon,
  KeyIcon,
  UserIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

interface UserDataTableProps {
  data: UserInfo[];
  isLoading?: boolean;
}

const UserDataTable = ({ data, isLoading }: UserDataTableProps) => {
  const router = useRouter();
  const [sortField, setSortField] = useState<keyof UserInfo>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = (id: string) => {
    router.push(`/adminv2/users/edit/${id}`);
  };

  const handleView = (id: string) => {
    router.push(`/adminv2/users/view/${id}`);
  };

  const handleChangePassword = (id: string) => {
    router.push(`/adminv2/users/change-password/${id}`);
  };

  const handleSort = (field: keyof UserInfo) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredData = data.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.telephone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (!aValue && !bValue) return 0;
    if (!aValue) return sortDirection === "asc" ? 1 : -1;
    if (!bValue) return sortDirection === "asc" ? -1 : 1;

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "short",
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

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">
            ผู้ใช้ทั้งหมด ({data.length})
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className="px-6 py-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="ค้นหาด้วยชื่อ, อีเมล หรือเบอร์โทร..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                onClick={() => handleSort("name")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>ชื่อ</span>
                  {sortField === "name" && (
                    <span className="text-blue-500">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                onClick={() => handleSort("email")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>อีเมล</span>
                  {sortField === "email" && (
                    <span className="text-blue-500">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                เบอร์โทร
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                เพศ
              </th>
              <th
                onClick={() => handleSort("age")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>อายุ</span>
                  {sortField === "age" && (
                    <span className="text-blue-500">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                onClick={() => handleSort("role")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>บทบาท</span>
                  {sortField === "role" && (
                    <span className="text-blue-500">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                onClick={() => handleSort("createdAt")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>วันที่สมัคร</span>
                  {sortField === "createdAt" && (
                    <span className="text-blue-500">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                การดำเนินการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2">กำลังโหลด...</span>
                  </div>
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {searchTerm
                    ? "ไม่พบผู้ใช้ที่ตรงกับการค้นหา"
                    : "ไม่พบข้อมูลผู้ใช้"}
                </td>
              </tr>
            ) : (
              sortedData.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.telephone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {getGenderLabel(user.gender)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.age} ปี</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(
                        user.role
                      )}`}
                    >
                      {user.role === UserRole.ADMIN ? (
                        <ShieldCheckIcon className="h-3 w-3 mr-1" />
                      ) : (
                        <UserIcon className="h-3 w-3 mr-1" />
                      )}
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleView(user.id)}
                        className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded"
                        title="ดู"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="p-1 text-yellow-600 hover:text-yellow-900 hover:bg-yellow-50 rounded"
                        title="แก้ไข"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleChangePassword(user.id)}
                        className="p-1 text-green-600 hover:text-green-900 hover:bg-green-50 rounded"
                        title="เปลี่ยนรหัสผ่าน"
                      >
                        <KeyIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDataTable;
