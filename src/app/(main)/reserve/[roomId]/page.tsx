"use client";

import { useParams, useRouter } from "next/navigation";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useRoom from "@/api/room/useRoom";
import useApartment from "@/api/apartment/useApartment";
import { RoomStatus } from "@/enum/RoomStatus";
import BackButton from "@/components/BackButton";

export default function RoomDetail() {
  const { roomId } = useParams<{ roomId: string }>();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const cancelButtonRef = useRef(null);

  const {
    data: room,
    isLoading: roomLoading,
    error: roomError,
  } = useRoom(roomId);

  const {
    data: apartment,
    isLoading: apartmentLoading,
    error: apartmentError,
  } = useApartment(room?.apartmentId || "");

  const isLoading = roomLoading || apartmentLoading;
  const hasError = roomError || apartmentError;

  if (isLoading) {
    return (
      <div className="container mx-auto mt-5">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">กำลังโหลด...</div>
        </div>
      </div>
    );
  }

  if (hasError || !room) {
    return (
      <div className="container mx-auto mt-5">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-red-600">ไม่พบข้อมูลห้องพัก</div>
        </div>
      </div>
    );
  }

  const isAvailable = room.status === RoomStatus.Available;

  const handleReserve = () => {
    router.push(`/reserve/confirm/${room.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH").format(price);
  };

  return (
    <>
      <div className="w-100 relative text-center">
        <img src="/homeAsset/2.jpg" className="object-cover h-96 w-screen" />
        <div className="h-full w-full top-1/2 absolute -translate-y-1/2 p-8 bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/0 text-center">
          <div className="text-5xl font-bold text-white mt-36">
            รายละเอียดห้องพัก
          </div>
        </div>
      </div>

      <div className="container mx-auto mb-44 mt-10">
        <div className="mb-6">
          <BackButton href="/reserve" />
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  ห้อง {room.no}
                </h1>
                <p className="text-xl text-gray-600">{apartment?.name}</p>
              </div>
              <div className="text-right">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    isAvailable
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isAvailable ? "ห้องว่าง" : "ห้องไม่ว่าง"}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    รายละเอียดห้องพัก
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {room.description || "ไม่มีรายละเอียด"}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    ข้อมูลอพาทเมนต์
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {apartment?.description || "ไม่มีรายละเอียด"}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    ราคาและค่าใช้จ่าย
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ค่าเช่ารายเดือน:</span>
                      <span className="font-semibold text-gray-900">
                        {formatPrice(room.monthlyPrice)} บาท
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">เงินประกัน:</span>
                      <span className="font-semibold text-gray-900">
                        {formatPrice(room.securityDeposit)} บาท
                      </span>
                    </div>
                    {apartment && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            ค่าน้ำ (ต่อหน่วย):
                          </span>
                          <span className="font-semibold text-gray-900">
                            {formatPrice(apartment.plumbingPrice)} บาท
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            ค่าไฟ (ต่อหน่วย):
                          </span>
                          <span className="font-semibold text-gray-900">
                            {formatPrice(apartment.electricityPrice)} บาท
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {isAvailable && (
                  <button
                    onClick={handleReserve}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition duration-200 ease-in-out transform"
                  >
                    จองห้องพักนี้
                  </button>
                )}

                {!isAvailable && (
                  <div className="w-full bg-gray-400 text-white font-bold py-4 px-6 rounded-lg text-lg text-center cursor-not-allowed">
                    ห้องพักนี้ไม่ว่าง
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
