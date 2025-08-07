"use client";

import useRoomsV2 from "@/api/room/useRoomsV2";
import RoomDataTableV2 from "@/components/admin/v2/RoomDataTableV2";

const RoomListV2 = () => {
  const { data: rooms = [], isLoading, error } = useRoomsV2();

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-red-600 text-center">
          <p className="text-lg font-semibold">เกิดข้อผิดพลาด</p>
          <p className="text-sm mt-2">ไม่สามารถโหลดข้อมูลห้องพักได้ กรุณาลองใหม่อีกครั้ง</p>
        </div>
      </div>
    );
  }

  return <RoomDataTableV2 data={rooms} isLoading={isLoading} />;
};

export default RoomListV2;
