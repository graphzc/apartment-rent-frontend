"use client";

import MyReserveList from "@/components/reserve/MyReserveList";

export default function MyReservePage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-10 text-black text-center sm:text-left">
        การจองของฉัน
      </h1>
      <MyReserveList />
    </div>
  );
}
