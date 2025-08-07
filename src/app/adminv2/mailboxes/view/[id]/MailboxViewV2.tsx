"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BackButton from "@/components/BackButton";
import useMailboxV2 from "@/api/mailbox/useMailboxV2";
import Swal from "sweetalert2";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

interface MailboxViewV2Props {
  id: string;
}

const MailboxViewV2 = ({ id }: MailboxViewV2Props) => {
  const router = useRouter();
  const { data: mailbox, isLoading, error } = useMailboxV2(id);

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถโหลดข้อมูลข้อความได้",
        icon: "error",
        confirmButtonText: "กลับไปหน้ารายการ",
      }).then(() => {
        router.push("/adminv2/mailboxes");
      });
    }
  }, [error, router]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">
              กำลังโหลดข้อมูลข้อความ...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (!mailbox) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-gray-900">
              รายละเอียดข้อความ
            </h2>
            {mailbox.readAt ? (
              <div className="flex items-center space-x-1 text-green-600">
                <CheckCircleIcon className="h-5 w-5" />
                <span className="text-sm font-medium">อ่านแล้ว</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-orange-600">
                <ExclamationTriangleIcon className="h-5 w-5" />
                <span className="text-sm font-medium">ยังไม่อ่าน</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() =>
                router.push(`/adminv2/mailboxes/edit/${mailbox.id}`)
              }
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              แก้ไข
            </button>
            <BackButton href="/adminv2/mailboxes" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {mailbox.title}
            </h3>
          </div>

          {/* Booking Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-md font-semibold text-gray-900 mb-2">
              ข้อมูลการจอง
            </h4>
            <p className="text-sm text-gray-700">
              <span className="font-medium">รหัสการจอง:</span>{" "}
              {mailbox.toBookingId}
            </p>
          </div>

          {/* Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-500 border-b pb-4">
            <div>
              <span className="font-medium">ส่งเมื่อ:</span>{" "}
              {formatDate(mailbox.createdAt)}
            </div>
            <div>
              <span className="font-medium">แก้ไขล่าสุด:</span>{" "}
              {formatDate(mailbox.updatedAt)}
            </div>
            {mailbox.readAt && (
              <div>
                <span className="font-medium">อ่านเมื่อ:</span>{" "}
                {formatDate(mailbox.readAt)}
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-3">
              เนื้อหาข้อความ
            </h4>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                {mailbox.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailboxViewV2;
