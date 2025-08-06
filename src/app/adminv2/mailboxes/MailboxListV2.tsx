"use client";

import useMailboxesV2 from "@/api/mailbox/useMailboxesV2";
import MailboxDataTableV2 from "@/components/admin/v2/MailboxDataTableV2";

const MailboxListV2 = () => {
  const { data: mailboxes = [], isLoading, error } = useMailboxesV2();

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-red-600 text-center">
          <p className="text-lg font-semibold">เกิดข้อผิดพลาด</p>
          <p className="text-sm mt-2">
            ไม่สามารถโหลดข้อมูลกล่องข้อความได้ กรุณาลองใหม่อีกครั้ง
          </p>
        </div>
      </div>
    );
  }

  return <MailboxDataTableV2 data={mailboxes} isLoading={isLoading} />;
};

export default MailboxListV2;
