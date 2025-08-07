"use client";

import { useRouter } from "next/navigation";
import RoomForm from "@/components/admin/v2/RoomForm";
import BackButton from "@/components/BackButton";
import { CreateRoomRequest } from "@/interface/requests/RoomV2Request";
import useCreateRoomV2 from "@/api/room/useCreateRoomV2";
import Swal from "sweetalert2";

const RoomCreateV2 = () => {
  const router = useRouter();
  const createRoom = useCreateRoomV2();

  const handleSubmit = async (data: CreateRoomRequest) => {
    try {
      await createRoom.mutateAsync(data);
      
      Swal.fire({
        title: "สำเร็จ!",
        text: "เพิ่มห้องพักเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง"
      }).then(() => {
        router.push("/adminv2/rooms");
      });
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถเพิ่มห้องพักได้",
        icon: "error",
        confirmButtonText: "ตกลง"
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            เพิ่มห้องพัก
          </h2>
          <BackButton href="/adminv2/rooms" />
        </div>
      </div>
      
      <div className="p-6">
        <RoomForm
          mode="create"
          onSubmit={handleSubmit}
          isLoading={createRoom.isPending}
        />
      </div>
    </div>
  );
};

export default RoomCreateV2;
