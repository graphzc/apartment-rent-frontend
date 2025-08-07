import { Suspense } from "react";
import RoomListV2 from "./RoomListV2";

const RoomsPage = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">จัดการห้องพัก</h1>
        <p className="text-gray-600 mt-1">จัดการข้อมูลห้องพัก เพิ่ม แก้ไข ลบ และดูรายละเอียดห้องพัก</p>
      </div>
      
      <Suspense fallback={
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">กำลังโหลด...</span>
        </div>
      }>
        <RoomListV2 />
      </Suspense>
    </div>
  );
};

export default RoomsPage;
