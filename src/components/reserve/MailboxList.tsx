import { useState, useMemo, useEffect } from "react";
import useMailboxes from "@/api/mailbox/useMailboxes";
import useHideMailbox from "@/api/mailbox/useHideMailbox";
import Pagination from "@/components/Pagination";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

/**
 * MailboxList Component
 *
 * Features:
 * - Fetches all mailboxes and implements client-side filtering for user-hidden messages
 * - Client-side pagination for better performance and instant navigation
 * - Users can hide their own mailboxes and toggle to show/hide them
 * - Responsive design with mobile-friendly pagination
 *
 * Usage:
 * // Users can hide/show their own mailboxes
 * <MailboxList bookingId="123" onSelectMailbox={handleSelect} />
 */

interface MailboxListProps {
  bookingId: string;
  onSelectMailbox: (mailboxId: string) => void;
}

const MailboxList = ({ bookingId, onSelectMailbox }: MailboxListProps) => {
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const [showHidden, setShowHidden] = useState(false);
  const limit = 10;

  // Fetch all mailboxes from backend (always includes all mailboxes)
  const { data: allMailboxes = [], isLoading } = useMailboxes(bookingId);

  // Client-side filtering and pagination
  const paginatedData = useMemo(() => {
    let filteredMailboxes = allMailboxes;

    // Filter based on user's hide preference - only show visible mailboxes unless toggle is on
    if (!showHidden) {
      filteredMailboxes = allMailboxes.filter(
        (mailbox) => !mailbox.isHideFromUser
      );
    }

    // Calculate pagination
    const total = filteredMailboxes.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    const data = filteredMailboxes.slice(startIndex, endIndex);

    return {
      data,
      total,
      totalPages,
      currentPage,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
    };
  }, [allMailboxes, showHidden, currentPage, limit]);

  // Reset to page 1 when showHidden toggle changes
  useEffect(() => {
    setCurrentPage(1);
  }, [showHidden]);

  const hideMailboxMutation = useHideMailbox();

  if (isLoading) return <p>Loading...</p>;

  const visibleMailboxes = paginatedData.data;
  const totalPages = paginatedData.totalPages;
  const hasNext = paginatedData.hasNext;
  const hasPrev = paginatedData.hasPrev;

  const handleHideToggle = (mailboxId: string, currentHideStatus: boolean) => {
    hideMailboxMutation.mutate({
      id: mailboxId,
      isHideFromUser: !currentHideStatus,
    });
  };

  if (visibleMailboxes.length === 0 && !isLoading) {
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
    <div className="bg-white shadow-lg rounded-lg">
      <div className="p-6 pb-0">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                กล่องข้อความ
              </h3>
              <p className="text-sm text-gray-600">
                ข้อความและการแจ้งเตือนของคุณ
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={showHidden}
                  onChange={(e) => setShowHidden(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">
                  แสดงข้อความที่ซ่อน
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {visibleMailboxes.map((mailbox) => (
            <div
              key={mailbox.id}
              className={`border rounded-lg p-4 transition-colors ${
                mailbox.readAt ? "bg-white" : "bg-blue-50 border-blue-200"
              } ${
                mailbox.isHideFromUser
                  ? "opacity-60 bg-red-50 border-red-200"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex-1 cursor-pointer hover:bg-gray-50 p-2 -m-2 rounded transition-colors"
                  onClick={() => onSelectMailbox(mailbox.id)}
                >
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
                    {mailbox.isHideFromUser && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        ซ่อนแล้ว
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

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleHideToggle(mailbox.id, mailbox.isHideFromUser)
                    }
                    disabled={hideMailboxMutation.isPending}
                    className={`p-2 rounded-md transition-colors ${
                      mailbox.isHideFromUser
                        ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                    } disabled:opacity-50`}
                    title={
                      mailbox.isHideFromUser ? "แสดงข้อความ" : "ซ่อนข้อความ"
                    }
                  >
                    {mailbox.isHideFromUser ? (
                      <EyeIcon className="h-4 w-4" />
                    ) : (
                      <EyeSlashIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
    </div>
  );
};

export default MailboxList;
