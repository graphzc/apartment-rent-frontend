"use client";

import { useRouter } from "next/navigation";
import MailboxForm from "@/components/admin/v2/MailboxForm";
import BackButton from "@/components/BackButton";
import { CreateMailboxRequest } from "@/interface/requests/MailboxV2Request";
import useCreateMailboxV2 from "@/api/mailbox/useCreateMailboxV2";
import Swal from "sweetalert2";

const MailboxCreateV2 = () => {
  const router = useRouter();
  const createMailbox = useCreateMailboxV2();

  const handleSubmit = async (data: CreateMailboxRequest) => {
    try {
      await createMailbox.mutateAsync(data);

      Swal.fire({
        title: "สำเร็จ!",
        text: "ส่งข้อความเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then(() => {
        router.push("/adminv2/mailboxes");
      });
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถส่งข้อความได้",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            ส่งข้อความใหม่
          </h2>
          <BackButton href="/adminv2/mailboxes" />
        </div>
      </div>

      <div className="p-6">
        <MailboxForm
          mode="create"
          onSubmit={handleSubmit}
          isLoading={createMailbox.isPending}
        />
      </div>
    </div>
  );
};

export default MailboxCreateV2;
