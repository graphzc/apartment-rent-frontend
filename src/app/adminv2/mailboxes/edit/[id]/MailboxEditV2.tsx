"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MailboxForm from "@/components/admin/v2/MailboxForm";
import BackButton from "@/components/BackButton";
import { UpdateMailboxRequest } from "@/interface/requests/MailboxV2Request";
import useMailboxV2 from "@/api/mailbox/useMailboxV2";
import useUpdateMailboxV2 from "@/api/mailbox/useUpdateMailboxV2";
import Swal from "sweetalert2";

interface MailboxEditV2Props {
  id: string;
}

const MailboxEditV2 = ({ id }: MailboxEditV2Props) => {
  const router = useRouter();
  const {
    data: mailbox,
    isLoading: isLoadingMailbox,
    error,
  } = useMailboxV2(id);
  const updateMailbox = useUpdateMailboxV2();

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

  const handleSubmit = async (data: UpdateMailboxRequest) => {
    try {
      await updateMailbox.mutateAsync({ id, data });

      Swal.fire({
        title: "สำเร็จ!",
        text: "แก้ไขข้อความเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then(() => {
        router.push("/adminv2/mailboxes");
      });
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถแก้ไขข้อความได้",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };

  if (isLoadingMailbox) {
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
          <h2 className="text-lg font-semibold text-gray-900">
            แก้ไขข้อความ - {mailbox.title}
          </h2>
          <BackButton href="/adminv2/mailboxes" />
        </div>
      </div>

      <div className="p-6">
        <MailboxForm
          mode="edit"
          mailbox={mailbox}
          onSubmit={handleSubmit}
          isLoading={updateMailbox.isPending}
        />
      </div>
    </div>
  );
};

export default MailboxEditV2;
