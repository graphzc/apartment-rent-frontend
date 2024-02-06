import MySwal, { warningAlert } from "@/lib/sweetAlert";

interface DeleteButtonProps {
    id: string;
    handleDelete: (id: string) => void;
};

export default function DeleteButton({ id, handleDelete }:  DeleteButtonProps) {
    const deleteConfirm = (id: string) => {
        warningAlert({
            // Generate delete message in th
            title: "คุณต้องการอพาร์ทเม้นท์ลบ?",
            text: "เมื่อลบแล้วจะไม่สามารถกู้คืนข้อมูลได้",
            confirmButtonText: "ลบ",
            cancelButtonText: "ยกเลิก",
            onConfirm: () => handleDelete(id),
        });

    }
    return (
        <button 
            className="bg-red-500 px-2 py-1 rounded-lg text-white"
            onClick={() => deleteConfirm(id)}
        >
           ลบ
        </button>
    )

};