"use client";

import Apartment from "@/interface/Apartment";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Room from "@/interface/Room";
import ReserveRoomList from "@/components/reserve/RoomList";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Reserve() {
  const router = useRouter();

  const reserve = (apartment: Apartment, room: Room) => {
    router.push(`/reserve/confirm/${room.id}`);
  };

  return (
    <>
      <div className="w-100 relative text-center">
        <img src="/homeAsset/2.jpg" className="object-cover h-96 w-screen " />
        <div className="h-full w-full top-1/2 absolute -translate-y-1/2 p-8 bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/0 text-center ">
          <div className="text-5xl font-bold text-white mt-36">จองห้องพัก</div>
        </div>
      </div>
      <div className="container mx-auto mb-44">
        <div className="text-3xl font-bold my-10 text-black text-center sm:text-left">
          ห้องพักทั้งหมด
        </div>
        <div className="flex justify-end">
          <Link
            href="/reserve/my"
            className="bg-blue-500 text-white px-3 py-1 rounded-lg"
          >
            การจองของฉัน
          </Link>
        </div>
        <ReserveRoomList reserveFunction={reserve} />
      </div>
    </>
  );
}
