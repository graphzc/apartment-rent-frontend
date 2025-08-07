"use client";

import { useBillingV2 } from "@/api/billing/useBillingV2";
import { useUpdateBillingStatusV2 } from "@/api/billing/useUpdateBillingStatusV2";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import {
  CalendarIcon,
  UserIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  PhotoIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

interface BillingViewV2Props {
  id: string;
}

const BillingViewV2 = ({ id }: BillingViewV2Props) => {
  const { data, isLoading, error } = useBillingV2(id);
  const updateStatusMutation = useUpdateBillingStatusV2();

  const handleStatusChange = async (
    newStatus: "PENDING" | "PAID" | "FAILED"
  ) => {
    updateStatusMutation.mutate({ id, status: newStatus });
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
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusInfo = (status: string) => {
    const statusMap = {
      PENDING: {
        color: "text-yellow-800 bg-yellow-100",
        icon: ClockIcon,
        text: "รอชำระ",
      },
      PAID: {
        color: "text-green-800 bg-green-100",
        icon: CheckCircleIcon,
        text: "ชำระแล้ว",
      },
      FAILED: {
        color: "text-red-800 bg-red-100",
        icon: XCircleIcon,
        text: "ชำระไม่สำเร็จ",
      },
    };

    return (
      statusMap[status as keyof typeof statusMap] || {
        color: "text-gray-800 bg-gray-100",
        icon: ClockIcon,
        text: status,
      }
    );
  };

  const getTypeInfo = (type: string) => {
    const typeMap = {
      FIRST_TIME_BOOKING: {
        color: "text-blue-800 bg-blue-100",
        text: "จองครั้งแรก",
      },
      MONTHLY_RENT: {
        color: "text-purple-800 bg-purple-100",
        text: "ค่าเช่ารายเดือน",
      },
      UTILITY: {
        color: "text-orange-800 bg-orange-100",
        text: "ค่าสาธารณูปโภค",
      },
    };

    return (
      typeMap[type as keyof typeof typeMap] || {
        color: "text-gray-800 bg-gray-100",
        text: type,
      }
    );
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

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">ไม่พบข้อมูลบิล</p>
      </div>
    );
  }

  const billing = data;
  const statusInfo = getStatusInfo(billing.status);
  const typeInfo = getTypeInfo(billing.type);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <BackButton href="/adminv2/billings" />
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                บิลเลขที่ #{billing.billingReference}
              </h1>
              <p className="text-gray-600 mt-1">รายละเอียดบิลการชำระเงิน</p>
            </div>
            <div className="flex items-center space-x-4">
              {billing.status === "PAID" && (
                <Link
                  href={`/receipt/${billing.id}`}
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                  ดูใบเสร็จ
                </Link>
              )}
              <span
                className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${statusInfo.color}`}
              >
                <StatusIcon className="h-4 w-4 mr-1" />
                {statusInfo.text}
              </span>
              <span
                className={`inline-flex px-3 py-2 rounded-full text-sm font-medium ${typeInfo.color}`}
              >
                {typeInfo.text}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Billing Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  ข้อมูลบิล
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <DocumentTextIcon className="h-5 w-5 text-gray-400 mt-1 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        เลขที่บิล
                      </p>
                      <p className="text-gray-600">
                        #{billing.billingReference}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <UserIcon className="h-5 w-5 text-gray-400 mt-1 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        ผู้ใช้งาน
                      </p>
                      <p className="text-gray-600">{billing.userName}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mt-1 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        จำนวนเงิน
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(billing.amount)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CalendarIcon className="h-5 w-5 text-gray-400 mt-1 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        กำหนดชำระ
                      </p>
                      <p className="text-gray-600">
                        {formatDate(billing.dueDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CalendarIcon className="h-5 w-5 text-gray-400 mt-1 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        วันที่สร้างบิล
                      </p>
                      <p className="text-gray-600">
                        {formatDate(billing.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Management */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  จัดการสถานะ
                </h2>
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    เปลี่ยนสถานะบิล
                  </label>
                  <div className="flex space-x-3">
                    {["PENDING", "PAID", "FAILED"].map((status) => (
                      <button
                        key={status}
                        onClick={() =>
                          handleStatusChange(
                            status as "PENDING" | "PAID" | "FAILED"
                          )
                        }
                        disabled={
                          updateStatusMutation.isPending ||
                          billing.status === status
                        }
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          billing.status === status
                            ? "bg-blue-100 text-blue-700 cursor-not-allowed"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } disabled:opacity-50`}
                      >
                        {status === "PENDING" && "รอชำระ"}
                        {status === "PAID" && "ชำระแล้ว"}
                        {status === "FAILED" && "ชำระไม่สำเร็จ"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Payment History */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  ประวัติการชำระเงิน ({billing.paymentHistory.length} รายการ)
                </h2>

                {billing.paymentHistory.length > 0 ? (
                  <div className="space-y-4">
                    {billing.paymentHistory.map((payment, index) => (
                      <div
                        key={payment.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">
                              การชำระครั้งที่ {index + 1}
                            </span>
                            <span
                              className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                payment.status === "PAID"
                                  ? "bg-green-100 text-green-800"
                                  : payment.status === "FAILED"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {payment.status === "PAID" && "สำเร็จ"}
                              {payment.status === "FAILED" && "ไม่สำเร็จ"}
                              {payment.status === "PENDING" && "รอตรวจสอบ"}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {formatDate(payment.createdAt)}
                          </p>
                        </div>

                        {payment.slipImage && (
                          <div className="mt-3">
                            <div className="flex items-center mb-2">
                              <PhotoIcon className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-700">
                                หลักฐานการชำระเงิน
                              </span>
                            </div>
                            <div className="relative">
                              <img
                                src={payment.slipImage}
                                alt="Payment Slip"
                                className="w-full max-w-xs h-auto rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                                onClick={() =>
                                  window.open(payment.slipImage, "_blank")
                                }
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                    <PhotoIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <p>ยังไม่มีประวัติการชำระเงิน</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>สร้างเมื่อ: {formatDate(billing.createdAt)}</p>
            <p>อัปเดตล่าสุด: {formatDate(billing.updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingViewV2;
