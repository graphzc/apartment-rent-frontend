"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookingV2 } from "@/interface/BookingV2";
import {
  EyeIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";

interface BookingDataTableV2Props {
  data: BookingV2[];
  isLoading?: boolean;
}

const BookingDataTableV2 = ({ data, isLoading }: BookingDataTableV2Props) => {
  const router = useRouter();
  const [sortField, setSortField] = useState<keyof BookingV2>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [contractFilter, setContractFilter] = useState<
    "all" | "accepted" | "pending"
  >("all");

  const handleView = (id: string) => {
    router.push(`/adminv2/bookings/view/${id}`);
  };

  const handleSort = (field: keyof BookingV2) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING_FOR_PAYMENT":
        return "bg-yellow-100 text-yellow-800";
      case "SUCCESS":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "TERMINATED":
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING_FOR_PAYMENT":
        return "รอชำระเงิน";
      case "SUCCESS":
        return "อยู่ในการเช่า";
      case "CANCELLED":
        return "ยกเลิก";
      case "TERMINATED":
        return "สิ้นสุด";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircleIcon className="h-4 w-4" />;
      case "PENDING_FOR_PAYMENT":
        return <ClockIcon className="h-4 w-4" />;
      case "CANCELLED":
        return <XCircleIcon className="h-4 w-4" />;
      case "TERMINATED":
        return <NoSymbolIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const filteredData = data.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomInfo.no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.apartmentInfo.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      !statusFilter ||
      booking.status.toLowerCase().includes(statusFilter.toLowerCase());

    const matchesContract =
      contractFilter === "all" ||
      (contractFilter === "accepted" && booking.isAcceptedContract) ||
      (contractFilter === "pending" && !booking.isAcceptedContract);

    return matchesSearch && matchesStatus && matchesContract;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;

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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const uniqueStatuses = Array.from(
    new Set(data.map((booking) => booking.status)),
  );

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">
            การจองทั้งหมด ({data.length})
          </h2>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="ค้นหาการจอง..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">ทุกสถานะ</option>
            {uniqueStatuses.map((status) => (
              <option key={status} value={status}>
                {getStatusText(status)}
              </option>
            ))}
          </select>
          <select
            value={contractFilter}
            onChange={(e) =>
              setContractFilter(
                e.target.value as "all" | "accepted" | "pending",
              )
            }
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">สถานะสัญญาทั้งหมด</option>
            <option value="accepted">ยอมรับสัญญาแล้ว</option>
            <option value="pending">รอยอมรับสัญญา</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ผู้เช่า
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ห้อง
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                อพาร์ตเมนต์
              </th>
              <th
                onClick={() => handleSort("startDate")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>วันที่เริ่ม</span>
                  {sortField === "startDate" && (
                    <span className="text-blue-500">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ราคาต่อเดือน
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                สถานะ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                สัญญา
              </th>
              <th
                onClick={() => handleSort("createdAt")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>วันที่จอง</span>
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
                  {searchTerm || statusFilter || contractFilter !== "all"
                    ? "ไม่พบการจองที่ตรงกับการค้นหา"
                    : "ไม่พบข้อมูลการจอง"}
                </td>
              </tr>
            ) : (
              sortedData.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.userInfo.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.userInfo.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.userInfo.telephone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {booking.roomInfo.no}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {booking.apartmentInfo.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(booking.startDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                      {formatPrice(booking.price.monthlyRent)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          booking.status,
                        )}`}
                      >
                        {getStatusIcon(booking.status)}
                        <span className="ml-1">
                          {getStatusText(booking.status)}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.isAcceptedContract ? (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        ยอมรับแล้ว
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        รอยอมรับ
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(booking.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleView(booking.id)}
                        className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded"
                        title="ดูรายละเอียด"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => router.push(`/contract/${booking.id}`)}
                        className="p-1 text-green-600 hover:text-green-900 hover:bg-green-50 rounded"
                        title="ดูสัญญา"
                      >
                        <DocumentTextIcon className="h-4 w-4" />
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

export default BookingDataTableV2;
