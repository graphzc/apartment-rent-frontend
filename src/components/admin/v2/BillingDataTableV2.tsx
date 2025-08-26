"use client";

import { useState } from "react";
import { BillingV2 } from "@/interface/BillingV2";
import { useBillingsV2 } from "@/api/billing/useBillingsV2";
import { useUpdateBillingStatusV2 } from "@/api/billing/useUpdateBillingStatusV2";
import { useGenerateMonthlyRentV2 } from "@/api/billing/useGenerateMonthlyRentV2";
import {
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface BillingDataTableV2Props {
  onBillingSelect?: (billing: BillingV2) => void;
}

const BillingDataTableV2 = ({ onBillingSelect }: BillingDataTableV2Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const limit = 10;

  const { data, isLoading, error } = useBillingsV2();

  const updateStatusMutation = useUpdateBillingStatusV2();
  const generateMonthlyRentMutation = useGenerateMonthlyRentV2();

  const handleStatusChange = async (
    billingId: string,
    newStatus: "PENDING" | "PAID" | "FAILED"
  ) => {
    updateStatusMutation.mutate({ id: billingId, status: newStatus });
  };

  const handleGenerateMonthlyRent = () => {
    generateMonthlyRentMutation.mutate();
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      PENDING: { color: "bg-yellow-100 text-yellow-800", text: "รอชำระ" },
      PAID: { color: "bg-green-100 text-green-800", text: "ชำระแล้ว" },
      FAILED: { color: "bg-red-100 text-red-800", text: "ชำระไม่สำเร็จ" },
    };

    const statusInfo = statusMap[status as keyof typeof statusMap] || {
      color: "bg-gray-100 text-gray-800",
      text: status,
    };

    return (
      <span
        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}
      >
        {statusInfo.text}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeMap = {
      FIRST_TIME_BOOKING: {
        color: "bg-blue-100 text-blue-800",
        text: "จองครั้งแรก",
      },
      MONTHLY_RENT: {
        color: "bg-purple-100 text-purple-800",
        text: "ค่าเช่ารายเดือน",
      },
      UTILITY: {
        color: "bg-orange-100 text-orange-800",
        text: "ค่าสาธารณูปโภค",
      },
    };

    const typeInfo = typeMap[type as keyof typeof typeMap] || {
      color: "bg-gray-100 text-gray-800",
      text: type,
    };

    return (
      <span
        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${typeInfo.color}`}
      >
        {typeInfo.text}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">กำลังโหลด...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
      </div>
    );
  }

  const billings = data || [];

  // Frontend filtering for search
  const filteredBillings = billings.filter((billing) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      billing.userName.toLowerCase().includes(searchLower) ||
      billing.billingReference.toLowerCase().includes(searchLower) ||
      billing.id.toLowerCase().includes(searchLower)
    );
  });


  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="ค้นหาผู้ใช้งาน, เลขที่บิล..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">ทุกสถานะ</option>
              <option value="PENDING">รอชำระ</option>
              <option value="PAID">ชำระแล้ว</option>
              <option value="FAILED">ชำระไม่สำเร็จ</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">ทุกประเภท</option>
              <option value="FIRST_TIME_BOOKING">จองครั้งแรก</option>
              <option value="MONTHLY_RENT">ค่าเช่ารายเดือน</option>
              <option value="UTILITY">ค่าสาธารณูปโภค</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerateMonthlyRent}
          disabled={generateMonthlyRentMutation.isPending}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          {generateMonthlyRentMutation.isPending
            ? "กำลังสร้าง..."
            : "สร้างบิลค่าเช่ารายเดือน"}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  เลขที่บิล
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ผู้ใช้งาน
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ประเภท
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  จำนวนเงิน
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  สถานะ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  วันที่สร้าง
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  กำหนดชำระ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  การดำเนินการ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBillings.map((billing) => (
                <tr key={billing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{billing.billingReference}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {billing.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getTypeBadge(billing.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(billing.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      value={billing.status}
                      onChange={(e) =>
                        handleStatusChange(
                          billing.id,
                          e.target.value as "PENDING" | "PAID" | "FAILED"
                        )
                      }
                      disabled={updateStatusMutation.isPending}
                      className="block w-full px-2 py-1 border border-gray-300 rounded-md bg-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="PENDING">รอชำระ</option>
                      <option value="PAID">ชำระแล้ว</option>
                      <option value="FAILED">ชำระไม่สำเร็จ</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(billing.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(billing.dueDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Link
                      href={`/adminv2/billings/${billing.id}`}
                      className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      ดู
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBillings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm
                ? "ไม่พบข้อมูลบิลที่ตรงกับการค้นหา"
                : "ไม่พบข้อมูลบิล"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingDataTableV2;
