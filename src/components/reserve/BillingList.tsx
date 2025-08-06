import useBillingList from "@/api/billing/useBillingList";
import DataTable from "@/components/DataTable";
import { TableColumn } from "react-data-table-component";
import Billing from "@/interface/Billing";

interface BillingListProps {
  bookingId: string;
  onSelectBilling: (billingId: string) => void;
}

const BillingList = ({ bookingId, onSelectBilling }: BillingListProps) => {
  const { data: bills = [], isLoading } = useBillingList(bookingId);

  if (isLoading) return <p>Loading...</p>;

  const columns: TableColumn<Billing>[] = [
    {
      name: "อ้างอิง",
      selector: (row) => row.billingReference,
      sortable: true,
      width: "140px",
    },
    {
      name: "ประเภท",
      selector: (row) =>
        row.type === "FIRST_TIME_BOOKING"
          ? "จองครั้งแรก"
          : row.type === "UTILITY"
          ? "ค่าสาธารณูปโภค"
          : row.type === "MONTHLY_RENT"
          ? "ค่าเช่ารายเดือน"
          : "อื่นๆ",
      sortable: true,
      width: "120px",
    },
    {
      name: "จำนวนเงิน",
      cell: (row) => (
        <div className="text-right">
          <span className="font-semibold text-green-600">
            {row.amount?.toLocaleString() || 0}
          </span>
          <span className="text-sm text-gray-500 ml-1">บาท</span>
        </div>
      ),
      sortable: true,
      width: "130px",
    },
    {
      name: "สถานะ",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "PENDING"
              ? "bg-yellow-100 text-yellow-800"
              : row.status === "PAID"
              ? "bg-green-100 text-green-800"
              : row.status === "OVERDUE"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.status === "PENDING"
            ? "รอชำระ"
            : row.status === "PAID"
            ? "ชำระแล้ว"
            : row.status === "OVERDUE"
            ? "เกินกำหนด"
            : row.status}
        </span>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: "วันครบกำหนด",
      cell: (row) => (
        <div className="text-sm">
          <div>{new Date(row.dueDate).toLocaleDateString("th-TH")}</div>
          <div className="text-xs text-gray-500">
            {row.status !== "PAID" &&
              (new Date(row.dueDate) < new Date() ? (
                <span className="text-red-600">เกินกำหนด</span>
              ) : (
                "ใน " +
                Math.ceil(
                  (new Date(row.dueDate).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                ) +
                " วัน"
              ))}
          </div>
        </div>
      ),
      sortable: true,
      width: "120px",
    },
    {
      name: "ดำเนินการ",
      cell: (row) => (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors shadow-sm"
          onClick={() => onSelectBilling(row.id)}
        >
          ดูรายละเอียด
        </button>
      ),
      width: "120px",
    },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          รายการใบแจ้งชำระเงิน
        </h3>
        <p className="text-sm text-gray-600">จัดการการชำระเงินของคุณ</p>
      </div>
      <DataTable<Billing> data={bills} columns={columns} />
    </div>
  );
};

export default BillingList;
