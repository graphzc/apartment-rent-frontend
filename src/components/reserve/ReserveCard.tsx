"use client";

import { PaymentStatus } from "@/enum/PaymentStatus";
import { RoomStatus } from "@/enum/RoomStatus";
import Apartment from "@/interface/Apartment";
import Room from "@/interface/Room";
import {
  HomeIcon,
  ExclamationTriangleIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

interface ReserveCardProps {
  room: Room;
  apartment: Apartment;
  reserveFunction: (apartment: Apartment, room: Room) => void;
}
export default function ReserveCard({
  apartment,
  room,
  reserveFunction,
}: ReserveCardProps) {
  const isAvaliable = room.status === RoomStatus.Available;

  return (
    <>
      {isAvaliable ? (
        <div className="rounded overflow-hidden shadow-xl mb-2 bg-gray-100 transition hover:duration-300 hover:scale-105 text-gray-800">
          <div className="px-6 py-4 text-center">
            <div className="flex justify-center items-center">
              <HomeIcon className="h-6 w-6" />
            </div>
            <div className="font-bold text-xl my-3">{room.no}</div>
            <p className="text-base mb-3">ห้องว่าง</p>
            <div className="space-y-2">
              <Link
                href={`/reserve/${room.id}`}
                className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
              >
                <EyeIcon className="h-4 w-4 mr-1" />
                ดูรายละเอียด
              </Link>
              <button
                onClick={() => reserveFunction(apartment, room)}
                className="w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                จองเลย
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded overflow-hidden shadow-xl mb-2 bg-red-100 transition text-red-800">
          <div className="px-6 py-4 text-center">
            <div className="flex justify-center items-center">
              <ExclamationTriangleIcon className="h-6 w-6" />
            </div>
            <div className="font-bold text-xl my-3">{room.no}</div>
            <p className="text-base mb-3">ห้องไม่ว่าง</p>
            <Link
              href={`/reserve/${room.id}`}
              className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            >
              <EyeIcon className="h-4 w-4 mr-1" />
              ดูรายละเอียด
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
