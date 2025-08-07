"use client";

import { useUnifiedBilling } from "@/api/billing/useUnifiedBilling";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import {
  DocumentTextIcon,
  PrinterIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  HomeIcon,
  CalendarIcon,
  UserIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

interface ReceiptViewProps {
  id: string;
}

const ReceiptView = ({ id }: ReceiptViewProps) => {
  const { data, isLoading, error } = useUnifiedBilling(id);
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // For future implementation - could generate PDF
    alert("ฟีเจอร์ดาวน์โหลด PDF จะเปิดให้ใช้งานเร็วๆ นี้");
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

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTypeInfo = (type: string) => {
    const typeMap = {
      FIRST_TIME_BOOKING: { text: "จองครั้งแรก" },
      MONTHLY_RENT: { text: "ค่าเช่ารายเดือน" },
      UTILITY: { text: "ค่าสาธารณูปโภค" },
    };

    return (
      typeMap[type as keyof typeof typeMap] || {
        text: type,
      }
    );
  };

  const getPaidPayment = (paymentHistory: any[]) => {
    return paymentHistory.find((payment) => payment.status === "PAID");
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
        <button
          onClick={() => router.back()}
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          กลับ
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">ไม่พบข้อมูลบิล</p>
        <button
          onClick={() => router.back()}
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          กลับ
        </button>
      </div>
    );
  }

  if (data.status !== "PAID") {
    return (
      <div className="text-center py-12">
        <p className="text-yellow-600">
          ใบเสร็จนี้ยังไม่สามารถดูได้ เนื่องจากยังไม่ได้ชำระเงิน
        </p>
        <button
          onClick={() => router.back()}
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          กลับ
        </button>
      </div>
    );
  }

  const billing = data;
  const typeInfo = getTypeInfo(billing.type);
  const paidPayment = getPaidPayment(billing.paymentHistory);

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Action Buttons - Hidden when printing */}
      <div className="print:hidden mb-6 flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <ArrowDownTrayIcon className="h-5 w-5 rotate-90" />
          กลับ
        </button>
        <div className="flex gap-4">
          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <PrinterIcon className="h-5 w-5" />
            พิมพ์
          </button>
        </div>
      </div>

      {/* Receipt Content - A4 Size */}
      <div
        ref={printRef}
        className="bg-white shadow-lg print:shadow-none"
        style={{
          width: "210mm",
          minHeight: "297mm",
          margin: "0 auto",
          padding: "20mm",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {/* Header */}
        <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HomeIcon className="h-12 w-12 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                ระบบจัดการอพาร์ทเม้นท์
              </h1>
              <p className="text-gray-600">Apartment Management System</p>
            </div>
          </div>
          <div className="bg-green-100 inline-flex items-center px-6 py-2 rounded-full">
            <CheckCircleIcon className="h-6 w-6 text-green-600 mr-2" />
            <span className="text-green-800 font-semibold text-lg">
              ใบเสร็จรับเงิน / RECEIPT
            </span>
          </div>
        </div>

        {/* Receipt Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              ข้อมูลใบเสร็จ
            </h3>
            <div className="space-y-3">
              <div className="flex">
                <span className="text-gray-600 w-32">เลขที่ใบเสร็จ:</span>
                <span className="font-semibold">
                  #{billing.billingReference}
                </span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-32">วันที่ออกใบเสร็จ:</span>
                <span>{formatDateShort(billing.createdAt)}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-32">วันที่ชำระ:</span>
                <span>
                  {paidPayment
                    ? formatDateShort(paidPayment.createdAt)
                    : formatDateShort(billing.updatedAt)}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              ข้อมูลลูกค้า
            </h3>
            <div className="space-y-3">
              <div className="flex">
                <span className="text-gray-600 w-32">ชื่อ:</span>
                <span className="font-semibold">{billing.userName}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-32">รหัสการจอง:</span>
                <span>{billing.bookingId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            รายละเอียดการชำระเงิน
          </h3>
          <div className="bg-gray-50 p-6 rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">รายการ</th>
                  <th className="text-center py-3 px-2">ประเภท</th>
                  <th className="text-center py-3 px-2">กำหนดชำระ</th>
                  <th className="text-right py-3 px-2">จำนวนเงิน</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-2">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-5 w-5 text-gray-500 mr-2" />
                      บิลเลขที่ #{billing.billingReference}
                    </div>
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {typeInfo.text}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <div className="flex items-center justify-center">
                      <CalendarIcon className="h-4 w-4 text-gray-500 mr-1" />
                      {formatDateShort(billing.dueDate)}
                    </div>
                  </td>
                  <td className="text-right py-4 px-2 font-semibold">
                    {formatCurrency(billing.amount)}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-800">
                  <td
                    colSpan={3}
                    className="py-4 px-2 text-right font-bold text-lg"
                  >
                    ยอดรวมทั้งสิ้น:
                  </td>
                  <td className="py-4 px-2 text-right font-bold text-xl text-green-600">
                    {formatCurrency(billing.amount)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            วิธีการชำระเงิน
          </h3>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center">
              <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="font-semibold text-green-800">ชำระเงินแล้ว</p>
                <p className="text-green-700 text-sm">
                  ชำระเมื่อ:{" "}
                  {paidPayment
                    ? formatDate(paidPayment.createdAt)
                    : formatDate(billing.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            หมายเหตุ
          </h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• ใบเสร็จนี้เป็นหลักฐานการชำระเงินที่สมบูรณ์</p>
            <p>• กรุณาเก็บใบเสร็จนี้ไว้เป็นหลักฐาน</p>
            <p>• หากมีข้อสงสัยกรุณาติดต่อฝ่ายบริการลูกค้า</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-gray-300 pt-6 mt-12">
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <div className="border-b border-gray-400 pb-2 mb-2 w-48 mx-auto"></div>
              <p className="text-sm text-gray-600">ลายเซ็นผู้รับเงิน</p>
              <p className="text-xs text-gray-500 mt-1">Signature</p>
            </div>
            <div className="text-center">
              <div className="border-b border-gray-400 pb-2 mb-2 w-48 mx-auto"></div>
              <p className="text-sm text-gray-600">วันที่</p>
              <p className="text-xs text-gray-500 mt-1">Date</p>
            </div>
          </div>

          <div className="text-center mt-8 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              ใบเสร็จนี้ออกโดยระบบจัดการอพาร์ทเม้นท์อัตโนมัติ
            </p>
            <p className="text-xs text-gray-500">
              Generated on {formatDate(new Date().toISOString())}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptView;
