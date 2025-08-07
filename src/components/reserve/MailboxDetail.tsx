import useMailboxDetail from "@/api/mailbox/useMailboxDetail";

interface MailboxDetailProps {
  mailboxId: string;
  onBack: () => void;
}

const MailboxDetail = ({ mailboxId, onBack }: MailboxDetailProps) => {
  const { data: mailbox, isLoading } = useMailboxDetail(mailboxId);

  if (isLoading || !mailbox)
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
          onClick={onBack}
        >
          ← กลับไปที่กล่องข้อความ
        </button>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{mailbox.title}</h2>
          {!mailbox.readAt && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              ข้อความใหม่
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">
          ได้รับเมื่อ:{" "}
          {new Date(mailbox.createdAt).toLocaleDateString("th-TH", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        {mailbox.readAt && (
          <p className="text-sm text-gray-500">
            อ่านแล้วเมื่อ:{" "}
            {new Date(mailbox.readAt).toLocaleDateString("th-TH", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            เนื้อหาข้อความ
          </label>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-gray-900 whitespace-pre-wrap">
              {mailbox.content}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID ข้อความ
            </label>
            <div className="text-sm text-gray-600">{mailbox.id}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              การจองที่เกี่ยวข้อง
            </label>
            <div className="text-sm text-gray-600">{mailbox.toBookingId}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              วันที่สร้าง
            </label>
            <div className="text-sm text-gray-600">
              {new Date(mailbox.createdAt).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              วันที่อัปเดตล่าสุด
            </label>
            <div className="text-sm text-gray-600">
              {new Date(mailbox.updatedAt).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailboxDetail;
