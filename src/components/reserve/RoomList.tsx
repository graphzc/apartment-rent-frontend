import ReserveCard from "./ReserveCard";
import Room from "@/interface/Room";
import Apartment from "@/interface/Apartment";
import useApartmentsWithRooms from "@/api/apartment/useApartmentsWithRooms";
import { useState } from "react";
import { RoomStatus } from "@/enum/RoomStatus";

interface ReserveRoomListProps {
  reserveFunction: (apartment: Apartment, room: Room) => void;
}

export default function ReserveRoomList({
  reserveFunction,
}: ReserveRoomListProps) {
  const { data: apartments, error, isPending } = useApartmentsWithRooms();
  const [hideUnavailable, setHideUnavailable] = useState(false);

  if (error) {
    return <div>Error</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={hideUnavailable}
                onChange={() => setHideUnavailable(!hideUnavailable)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-700">
                แสดงเฉพาะห้องว่าง
              </span>
            </label>
          </div>
        </div>
      </div>

      {apartments?.map((apartment) => {
        const availableRooms =
          apartment.rooms?.filter(
            (room) => room.status === RoomStatus.Available
          ) || [];

        const unavailableRooms =
          apartment.rooms?.filter(
            (room) => room.status !== RoomStatus.Available
          ) || [];

        const filteredRooms = hideUnavailable
          ? availableRooms
          : apartment.rooms || [];

        return (
          <div key={apartment.id} className="mb-10">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl">อพาทเมนต์: {apartment.name}</h3>
              <div className="text-sm text-gray-600">
                <span className="text-green-600 font-medium">
                  {availableRooms.length} ห้องว่าง
                </span>
                <span className="mx-1">|</span>
                <span className="text-red-600 font-medium">
                  {unavailableRooms.length} ห้องไม่ว่าง
                </span>
                <span className="mx-1">|</span>
                <span className="font-medium">
                  ทั้งหมด {apartment.rooms?.length || 0} ห้อง
                </span>
              </div>
            </div>

            {filteredRooms.length > 0 ? (
              <div className="grid 2xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-4 sm:gap-7 gap-5 grid-cols-2 px-5">
                {filteredRooms.map((room, i) => {
                  return (
                    <ReserveCard
                      key={i}
                      room={room}
                      apartment={apartment}
                      reserveFunction={reserveFunction}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">ไม่มีห้องในอพาร์ทเมนต์นี้</p>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
