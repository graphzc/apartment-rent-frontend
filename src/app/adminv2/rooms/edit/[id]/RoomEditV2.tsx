"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import RoomForm from "@/components/admin/v2/RoomForm";
import BackButton from "@/components/BackButton";
import { UpdateRoomRequest } from "@/interface/requests/RoomV2Request";
import useRoomV2 from "@/api/room/useRoomV2";
import useUpdateRoomV2 from "@/api/room/useUpdateRoomV2";
import Swal from "sweetalert2";

interface RoomEditV2Props {
  id: string;
}

const RoomEditV2 = ({ id }: RoomEditV2Props) => {
  const router = useRouter();
  const { data: room, isLoading: isLoadingRoom, error } = useRoomV2(id);
  const updateRoom = useUpdateRoomV2();

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถโหลดข้อมูลห้องพักได้",
        icon: "error",
        confirmButtonText: "กลับไปหน้ารายการ"
      }).then(() => {
        router.push("/adminv2/rooms");
      });
    }
  }, [error, router]);

  const handleSubmit = async (data: UpdateRoomRequest) => {
    try {
      await updateRoom.mutateAsync({ id, data });
      
      Swal.fire({
        title: "สำเร็จ!",
        text: "แก้ไขห้องพักเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง"
      }).then(() => {
        router.push("/adminv2/rooms");
      });
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถแก้ไขห้องพักได้",
        icon: "error",
        confirmButtonText: "ตกลง"
      });
    }
  };

  if (isLoadingRoom) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">กำลังโหลดข้อมูลห้องพัก...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!room) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            แก้ไขห้องพัก - {room.no}
          </h2>
          <BackButton href="/adminv2/rooms" />
        </div>
      </div>
      
      <div className="p-6">
        <RoomForm
          mode="edit"
          room={room}
          onSubmit={handleSubmit}
          isLoading={updateRoom.isPending}
        />
      </div>
    </div>
  );
};

export default RoomEditV2;
