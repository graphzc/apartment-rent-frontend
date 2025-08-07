import useMailboxes from "@/api/mailbox/useMailboxes";
import Mailbox from "@/interface/Mailbox";

interface MailboxListProps {
  bookingId: string;
  onSelectMailbox: (mailboxId: string) => void;
}

const MailboxList = ({ bookingId, onSelectMailbox }: MailboxListProps) => {
  const { data: mailboxes = [], isLoading } = useMailboxes(bookingId);

  if (isLoading) return <p>Loading...</p>;

  if (mailboxes.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">กล่องข้อความ</h3>
          <p className="text-sm text-gray-600">ข้อความและการแจ้งเตือนของคุณ</p>
        </div>
        <div className="text-center py-8">
          <div className="text-gray-400 text-5xl mb-4">📭</div>
          <p className="text-gray-500">ไม่มีข้อความในขณะนี้</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">กล่องข้อความ</h3>
        <p className="text-sm text-gray-600">ข้อความและการแจ้งเตือนของคุณ</p>
      </div>

      <div className="space-y-3">
        {mailboxes.map((mailbox) => (
          <div
            key={mailbox.id}
            className={`border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
              mailbox.readAt ? "bg-white" : "bg-blue-50 border-blue-200"
            }`}
            onClick={() => onSelectMailbox(mailbox.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4
                    className={`font-medium ${
                      mailbox.readAt ? "text-gray-700" : "text-blue-900"
                    }`}
                  >
                    {mailbox.title}
                  </h4>
                  {!mailbox.readAt && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      ใหม่
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(mailbox.createdAt).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="text-gray-400">→</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MailboxList;
