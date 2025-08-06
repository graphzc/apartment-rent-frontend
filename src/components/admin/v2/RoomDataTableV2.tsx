"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RoomV2, RoomStatus } from "@/interface/RoomV2";
import useDeleteRoomV2 from "@/api/room/useDeleteRoomV2";
import {
  PencilIcon,
  EyeIcon,
  TrashIcon,
  PlusIcon
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

interface RoomDataTableV2Props {
  data: RoomV2[];
  isLoading?: boolean;
}

const RoomDataTableV2 = ({ data, isLoading }: RoomDataTableV2Props) => {
  const router = useRouter();
  const deleteRoom = useDeleteRoomV2();
  const [sortField, setSortField] = useState<keyof RoomV2>("no");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<RoomStatus | "">("");

  const handleDelete = async (id: string, roomNo: string) => {
    const result = await Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: `คุณกำลังจะลบห้อง "${roomNo}" การดำเนินการนี้ไม่สามารถยกเลิกได้`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก"
    });

    if (result.isConfirmed) {
      deleteRoom.mutate(id);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/adminv2/rooms/edit/${id}`);
  };

  const handleView = (id: string) => {
    router.push(`/adminv2/rooms/view/${id}`);
  };

  const handleSort = (field: keyof RoomV2) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getStatusColor = (status: RoomStatus) => {
    switch (status) {
      case RoomStatus.AVAILABLE:
        return "bg-green-100 text-green-800";
      case RoomStatus.RESERVED:
        return "bg-yellow-100 text-yellow-800";
      case RoomStatus.RENTED:
        return "bg-blue-100 text-blue-800";
      case RoomStatus.INACTIVE:
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: RoomStatus) => {
    switch (status) {
      case RoomStatus.AVAILABLE:
        return "ว่าง";
      case RoomStatus.RESERVED:
        return "จอง";
      case RoomStatus.RENTED:
        return "เช่าแล้ว";
      case RoomStatus.INACTIVE:
        return "ไม่ใช้งาน";
      default:
        return status;
    }
  };

  const filteredData = data.filter(room => {
    const matchesSearch = 
      room.no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (room.description && room.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = !statusFilter || room.status === statusFilter;
    
    return matchesSearch && matchesStatus;
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

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">
            ห้องพัก ({data.length})
          </h2>
          <button
            onClick={() => router.push("/adminv2/rooms/create")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            เพิ่มห้องพัก
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="ค้นหาห้องพัก..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as RoomStatus | "")}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">ทุกสถานะ</option>
            <option value={RoomStatus.AVAILABLE}>ว่าง</option>
            <option value={RoomStatus.RESERVED}>จอง</option>
            <option value={RoomStatus.RENTED}>เช่าแล้ว</option>
            <option value={RoomStatus.INACTIVE}>ไม่ใช้งาน</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                onClick={() => handleSort("no")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>หมายเลขห้อง</span>
                  {sortField === "no" && (
                    <span className="text-blue-500">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ที่อยู่
              </th>
              <th
                onClick={() => handleSort("monthlyPrice")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>ราคารายเดือน</span>
                  {sortField === "monthlyPrice" && (
                    <span className="text-blue-500">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                onClick={() => handleSort("securityDeposit")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>เงินประกัน</span>
                  {sortField === "securityDeposit" && (
                    <span className="text-blue-500">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                onClick={() => handleSort("status")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>สถานะ</span>
                  {sortField === "status" && (
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
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2">กำลังโหลด...</span>
                  </div>
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  {searchTerm || statusFilter ? "ไม่พบห้องพักที่ตรงกับการค้นหา" : "ไม่พบข้อมูลห้องพัก"}
                </td>
              </tr>
            ) : (
              sortedData.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{room.no}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {room.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatPrice(room.monthlyPrice)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatPrice(room.securityDeposit)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(room.status)}`}>
                      {getStatusText(room.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleView(room.id)}
                        className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded"
                        title="ดู"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(room.id)}
                        className="p-1 text-yellow-600 hover:text-yellow-900 hover:bg-yellow-50 rounded"
                        title="แก้ไข"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(room.id, room.no)}
                        className="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded"
                        title="ลบ"
                        disabled={deleteRoom.isPending}
                      >
                        <TrashIcon className="h-4 w-4" />
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

export default RoomDataTableV2;
