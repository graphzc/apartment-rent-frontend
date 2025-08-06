"use client";

import { useState } from "react";
import ReserveInfo from "@/components/reserve/ReserveInfo";
import { useParams } from "next/navigation";
import useBillingList from "@/api/billing/useBillingList";
import useBillingDetail from "@/api/billing/useBillingDetail";
import DataTable from "@/components/DataTable";
import { TableColumn } from "react-data-table-component";
import Billing from "@/interface/Billing";
import PaymentStatusBadge from "@/components/PaymentStatusBadge";

export default function MyReserveInfo() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<"details" | "utilities" | "billing">(
    "details"
  );
  const [selectedBillingId, setSelectedBillingId] = useState<string | null>(
    null
  );

  // Billing list component
  const BillingList = () => {
    const { data: bills = [], isLoading } = useBillingList(id!);
    if (isLoading) return <p>Loading...</p>;
    // Define columns for DataTable
    const columns: TableColumn<Billing>[] = [
      {
        name: "อ้างอิง",
        selector: (row) => row.billingReference,
        sortable: true,
        width: "140px",
      },
      {
        name: "ประเภท",
        selector: (row) =>
          row.type === "FIRST_TIME_BOOKING" ? "จองครั้งแรก" : row.type,
        sortable: true,
        width: "120px",
      },
      {
        name: "จำนวนเงิน",
        cell: (row) => (
          <div className="text-right">
            <span className="font-semibold text-green-600">
              {row.amount?.toLocaleString() || 0}
            </span>
            <span className="text-sm text-gray-500 ml-1">บาท</span>
          </div>
        ),
        sortable: true,
        width: "130px",
      },
      {
        name: "สถานะ",
        cell: (row) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              row.status === "PENDING"
                ? "bg-yellow-100 text-yellow-800"
                : row.status === "PAID"
                ? "bg-green-100 text-green-800"
                : row.status === "OVERDUE"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {row.status === "PENDING"
              ? "รอชำระ"
              : row.status === "PAID"
              ? "ชำระแล้ว"
              : row.status === "OVERDUE"
              ? "เกินกำหนด"
              : row.status}
          </span>
        ),
        sortable: true,
        width: "100px",
      },
      {
        name: "วันครบกำหนด",
        cell: (row) => (
          <div className="text-sm">
            <div>{new Date(row.dueDate).toLocaleDateString("th-TH")}</div>
            <div className="text-xs text-gray-500">
              {new Date(row.dueDate) < new Date() ? (
                <span className="text-red-600">เกินกำหนด</span>
              ) : (
                "ใน " +
                Math.ceil(
                  (new Date(row.dueDate).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                ) +
                " วัน"
              )}
            </div>
          </div>
        ),
        sortable: true,
        width: "120px",
      },
      {
        name: "ดำเนินการ",
        cell: (row) => (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors shadow-sm"
            onClick={() => setSelectedBillingId(row.id)}
          >
            ดูรายละเอียด
          </button>
        ),
        width: "120px",
      },
    ];
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            รายการใบแจ้งชำระเงิน
          </h3>
          <p className="text-sm text-gray-600">จัดการการชำระเงินของคุณ</p>
        </div>
        <DataTable<Billing> data={bills} columns={columns} />
      </div>
    );
  };

  // Billing detail component
  const BillingDetail = () => {
    const { data: bill, isLoading } = useBillingDetail(selectedBillingId!);
    if (isLoading || !bill)
      return (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      );

    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        <div className="border-b pb-4 mb-6">
          <button
            className="text-blue-600 hover:text-blue-800 text-sm mb-2 flex items-center"
            onClick={() => setSelectedBillingId(null)}
          >
            ← กลับไปที่รายการบิล
          </button>
          <h2 className="text-2xl font-bold text-gray-800">
            ใบแจ้งชำระเงิน {bill.billingReference}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            ผู้ใช้งาน: {bill.userName}
          </p>
        </div>

        {/* Bill Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                จำนวนเงิน
              </label>
              <div className="text-3xl font-bold text-green-600">
                {bill.amount?.toLocaleString() || 0} บาท
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                สถานะการชำระเงิน
              </label>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  bill.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-800"
                    : bill.status === "PAID"
                    ? "bg-green-100 text-green-800"
                    : bill.status === "OVERDUE"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {bill.status === "PENDING"
                  ? "รอชำระ"
                  : bill.status === "PAID"
                  ? "ชำระแล้ว"
                  : bill.status === "OVERDUE"
                  ? "เกินกำหนด"
                  : bill.status}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ประเภทการชำระ
              </label>
              <div className="text-gray-900">
                {bill.type === "FIRST_TIME_BOOKING" ? "จองครั้งแรก" : bill.type}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                วันครบกำหนดชำระ
              </label>
              <div className="text-gray-900">
                {new Date(bill.dueDate).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {new Date(bill.dueDate) < new Date() && (
                  <span className="ml-2 text-red-600 font-medium">
                    (เกินกำหนด)
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                วันที่สร้างใบแจ้งหนี้
              </label>
              <div className="text-gray-900">
                {new Date(bill.createdAt).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                วันที่อัปเดตล่าสุด
              </label>
              <div className="text-gray-900">
                {new Date(bill.updatedAt).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Payment History */}
        {bill.paymentHistory && bill.paymentHistory.length > 0 && (
          <div className="border-t pt-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              ประวัติการชำระเงิน
            </h3>
            <div className="space-y-2">
              {bill.paymentHistory.map((payment, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-700">
                    Payment history item {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Slip Upload */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            อัปโหลดสลิปการชำระเงิน
          </h3>

          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-medium
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              อัปโหลด
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4">
      {/* Page header */}
      <h1 className="text-3xl font-bold my-6 text-black">
        {tab === "details" && "รายละเอียดการจองห้องพัก"}
        {tab === "utilities" && "สาธารณูปโภค"}
        {tab === "billing" && "ใบแจ้งชำระเงิน"}
      </h1>
      <div className="flex">
        {/* Sidebar tabs */}
        <aside className="w-1/4 pr-4">
          <nav className="space-y-2">
            <button
              className={`block w-full text-left p-2 rounded ${
                tab === "details" ? "bg-gray-200" : ""
              }`}
              onClick={() => setTab("details")}
            >
              รายละเอียด
            </button>
            <button
              className={`block w-full text-left p-2 rounded ${
                tab === "utilities" ? "bg-gray-200" : ""
              }`}
              onClick={() => setTab("utilities")}
            >
              สาธารณูปโภค
            </button>
            <button
              className={`block w-full text-left p-2 rounded ${
                tab === "billing" ? "bg-gray-200" : ""
              }`}
              onClick={() => setTab("billing")}
            >
              ใบแจ้งชำระเงิน
            </button>
          </nav>
        </aside>

        {/* Content area */}
        <main className="flex-1">
          {tab === "details" && <ReserveInfo id={id} />}
          {tab === "utilities" && <p>หน้าสาธารณูปโภค กำลังพัฒนา...</p>}
          {tab === "billing" &&
            (selectedBillingId ? <BillingDetail /> : <BillingList />)}
        </main>
      </div>
    </div>
  );
}
