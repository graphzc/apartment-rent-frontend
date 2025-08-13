"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Utility from "@/interface/Utility";
import useDeleteAdminUtility from "@/api/utility/useDeleteAdminUtility";
import useBookingsV2 from "@/api/booking/useBookingsV2";
import {
  PencilIcon,
  EyeIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

interface UtilityDataTableProps {
  data: Utility[];
  isLoading?: boolean;
}

const UtilityDataTable = ({ data, isLoading }: UtilityDataTableProps) => {
  const router = useRouter();
  const deleteUtility = useDeleteAdminUtility();
  const { data: bookings, isLoading: bookingsLoading } = useBookingsV2();
  const [sortField, setSortField] = useState<keyof Utility>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");

  // Create a mapping from booking ID to room information
  const bookingToRoomMap = useMemo(() => {
    if (!bookings) return {}; 

    const map: { [bookingId: string]: { roomNo: string; roomName?: string } } =
      {};
    bookings.forEach((booking) => {
      if (booking.roomInfo) {
        map[booking.id] = {
          roomNo: booking.roomInfo.no || "N/A",
          roomName: booking.roomInfo.no,
        };
      }
    });
    return map;
  }, [bookings]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: `คุณกำลังจะลบข้อมูลสาธารณูปโภค การดำเนินการนี้ไม่สามารถยกเลิกได้`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      deleteUtility.mutate(id);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/adminv2/utilities/edit/${id}`);
  };

  const handleView = (id: string) => {
    router.push(`/adminv2/utilities/view/${id}`);
  };

  const handleSort = (field: keyof Utility) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredData = data.filter((utility) => {
    const roomInfo = bookingToRoomMap[utility.bookingId];
    const roomNo = roomInfo?.roomNo || "";

    return (
      utility.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      utility.billingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      roomNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };

  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const formatUsage = (usage: number) => {
    return `${usage} หน่วย`;
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">
            ข้อมูลสาธารณูปโภค ({data.length})
          </h2>
          <button
            onClick={() => router.push("/adminv2/utilities/create")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            เพิ่มข้อมูลสาธารณูปโภค
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-6 py-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="ค้นหาด้วย Booking ID, Billing ID หรือ หมายเลขห้อง..."
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                หมายเลขห้อง
              </th>
              <th
                onClick={() => handleSort("bookingId")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Booking ID</span>
                  {sortField === "bookingId" && (
                    <span className="text-blue-500">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                onClick={() => handleSort("billingId")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Billing ID</span>
                  {sortField === "billingId" && (
                    <span className="text-blue-500">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                onClick={() => handleSort("plumbingUsage")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>การใช้น้ำ</span>
                  {sortField === "plumbingUsage" && (
                    <span className="text-blue-500">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                onClick={() => handleSort("electricityUsage")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>การใช้ไฟ</span>
                  {sortField === "electricityUsage" && (
                    <span className="text-blue-500">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                onClick={() => handleSort("plumbingCharge")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>ค่าน้ำ</span>
                  {sortField === "plumbingCharge" && (
                    <span className="text-blue-500">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                onClick={() => handleSort("electricityCharge")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>ค่าไฟ</span>
                  {sortField === "electricityCharge" && (
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
                  <span>วันที่สร้าง</span>
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
            {isLoading || bookingsLoading ? (
              <tr>
                <td
                  colSpan={9}
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
                  colSpan={9}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {searchTerm
                    ? "ไม่พบข้อมูลสาธารณูปโภคที่ตรงกับการค้นหา"
                    : "ไม่พบข้อมูลสาธารณูปโภค"}
                </td>
              </tr>
            ) : (
              sortedData.map((utility) => {
                const roomInfo = bookingToRoomMap[utility.bookingId];
                return (
                  <tr key={utility.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {roomInfo?.roomNo || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {utility.bookingId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {utility.billingId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatUsage(utility.plumbingUsage)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatUsage(utility.electricityUsage)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatPrice(utility.plumbingCharge)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatPrice(utility.electricityCharge)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(utility.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleView(utility.id)}
                          className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded"
                          title="ดู"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(utility.id)}
                          className="p-1 text-yellow-600 hover:text-yellow-900 hover:bg-yellow-50 rounded"
                          title="แก้ไข"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(utility.id)}
                          className="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded"
                          title="ลบ"
                          disabled={deleteUtility.isPending}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UtilityDataTable;
