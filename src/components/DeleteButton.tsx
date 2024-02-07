import MySwal, { warningAlert } from "@/lib/sweetAlert";

interface DeleteButtonProps<T> {
    id: T;
    handleDelete: (id: T) => void;
};

export default function DeleteButton<T>({ id, handleDelete }:  DeleteButtonProps<T>) {
    const deleteConfirm = (id: T) => {
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