import useBillingDetail from "@/api/billing/useBillingDetail";
import useUploadImage from "@/api/billing/useUploadImage";
import usePayBilling from "@/api/billing/usePayBilling";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";

interface BillingDetailProps {
  billingId: string;
  onBack: () => void;
}

const BillingDetail = ({ billingId, onBack }: BillingDetailProps) => {
  const { data: bill, isLoading } = useBillingDetail(billingId);
  const uploadImageMutation = useUploadImage();
  const payBillingMutation = usePayBilling();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadSlip = async () => {
    if (!selectedFile) {
      toast.error("กรุณาเลือกไฟล์สลิปการชำระเงิน");
      return;
    }

    if (bill?.status === "PAID") {
      toast.warning("บิลนี้ชำระเงินแล้ว");
      return;
    }

    setIsUploading(true);
    try {
      // Upload image first
      const uploadResponse = await uploadImageMutation.mutateAsync(
        selectedFile
      );

      // Then make payment with the image URL
      await payBillingMutation.mutateAsync({
        billingId,
        paymentData: { slipImage: uploadResponse.url },
      });

      toast.success("อัปโหลดสลิปการชำระเงินสำเร็จ");
      setSelectedFile(null);
      // Clear the file input
      const fileInput = document.getElementById(
        "slip-file"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("เกิดข้อผิดพลาดในการอัปโหลดสลิป");
    } finally {
      setIsUploading(false);
    }
  };

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
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <button
              className="text-blue-600 hover:text-blue-800 text-sm mb-2 flex items-center"
              onClick={onBack}
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
          {bill.status === "PAID" && (
            <Link
              href={`/receipt/${bill.id}`}
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              ดูใบเสร็จ
            </Link>
          )}
        </div>
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
              {new Date(bill.dueDate) < new Date() &&
                bill.status !== "PAID" && (
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
          <div className="space-y-4">
            {bill.paymentHistory.map((payment, index) => (
              <div
                key={payment.id || index}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      การชำระครั้งที่ {index + 1}
                    </div>
                    <div className="text-xs text-gray-500">
                      รหัส: {payment.id}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      payment.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : payment.status === "PAID"
                        ? "bg-green-100 text-green-800"
                        : payment.status === "OVERDUE"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {payment.status === "PENDING"
                      ? "รอตรวจสอบ"
                      : payment.status === "PAID"
                      ? "ชำระแล้ว"
                      : payment.status === "OVERDUE"
                      ? "เกินกำหนด"
                      : payment.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <span className="text-xs font-medium text-gray-600">
                      วันที่ส่งสลิป:
                    </span>
                    <div className="text-sm text-gray-900">
                      {new Date(payment.createdAt).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-600">
                      อัปเดตล่าสุด:
                    </span>
                    <div className="text-sm text-gray-900">
                      {new Date(payment.updatedAt).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>

                {payment.slipImage && (
                  <div>
                    <span className="text-xs font-medium text-gray-600 mb-2 block">
                      สลิปการชำระเงิน:
                    </span>
                    <div className="flex items-center space-x-3">
                      <img
                        src={payment.slipImage}
                        alt="สลิปการชำระเงิน"
                        className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                      />
                      <a
                        href={payment.slipImage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                      >
                        ดูรูปภาพขนาดเต็ม
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Slip Upload */}
      {bill.status !== "PAID" && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            อัปโหลดสลิปการชำระเงิน
          </h3>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                id="slip-file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-medium
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                disabled={isUploading}
              />
              <button
                onClick={handleUploadSlip}
                disabled={!selectedFile || isUploading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {isUploading ? "กำลังอัปโหลด..." : "อัปโหลด"}
              </button>
            </div>

            {selectedFile && (
              <div className="text-sm text-gray-600">
                ไฟล์ที่เลือก: {selectedFile.name}
              </div>
            )}

            <div className="text-sm text-gray-500">
              <p>• รองรับไฟล์รูปภาพเท่านั้น (JPG, PNG, GIF)</p>
              <p>• ขนาดไฟล์ไม่เกิน 10MB</p>
            </div>
          </div>
        </div>
      )}

      {bill.status === "PAID" && (
        <div className="border-t pt-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  บิลนี้ได้รับการชำระเงินแล้ว
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingDetail;
