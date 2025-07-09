"use client";

import useBooking from "@/api/booking/useBooking";
import useMyBooking from "@/api/booking/useMyBooking";
import BackButton from "@/components/BackButton";
import CheckUtilityForm from "@/components/utility/CheckUtilityForm";
import Utility from "@/interface/Utility";
import { thDateString } from "@/utils/thDateConvertor";
import Link from "next/link";
import { useState } from "react";

export default function UtilityCheck({ params }: { params: { id: string } }) {
  const { data: booking, isLoading, error } = useBooking(parseInt(params.id));

  const [utilityPrice, setUtilityPrice] = useState({
    plumbing: -1,
    electricity: -1,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleCheck = async (utility: Utility) => {
    if (booking?.utility && booking?.utility.length > 0) {
      setUtilityPrice({
        plumbing: (utility.plumbing - booking.utility[0].plumbing) * 18,
        electricity: (utility.electricity - booking.utility[0].electricity) * 5,
      });
    }
  };

  return (
    <div>
      <div className="w-100 relative text-center">
        <img src="/homeAsset/2.jpg" className="object-cover h-96 w-screen " />
        <div className="h-full w-full top-1/2 absolute -translate-y-1/2 p-8 bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/0 text-center ">
          <div className="text-5xl font-bold text-white mt-36">สาธารณูปโภค</div>
        </div>
      </div>
      <div className="container mx-auto mb-44">
        <div className="mt-10">
          <BackButton href="/utility" />
        </div>

        <div className="text-3xl font-bold mt-1 mb-2 text-black text-center sm:text-left">
          เช็คค่าน้ำ/ค่าไฟ
        </div>
        <div className="text-xl">
          <b>ห้อง</b> {booking?.room.no}
        </div>
        {booking?.utility && booking?.utility.length > 0 ? (
          <div>
            <div className="my-2">
              <div className="text-xl font-semibold">หน่วยของเดือนล่าสุด</div>
              <span className="font-medium">ค่าน้ำประปา</span> :{" "}
              {booking.utility[0].plumbing * 18} บาท (
              {booking.utility[0].plumbing} หน่วย)
              <br />
              <span className="font-medium">ค่าไฟ</span> :{" "}
              {booking.utility[0].electricity * 5} บาท (
              {booking.utility[0].electricity} หน่วย)
              <br />
            </div>
            <div className="text-xl font-semibold mt-3">
              ใส่หน่วยปัจจุบันเพื่อคำนวณ
            </div>
            <CheckUtilityForm handleCheck={handleCheck} />
            {utilityPrice.electricity !== -1 && (
              <div className="mt-2">
                <span className="font-medium">ค่าน้ำประปา</span> :{" "}
                {utilityPrice.plumbing} บาท
                <br />
                <span className="font-medium">ค่าไฟ</span> :{" "}
                {utilityPrice.electricity} บาท
              </div>
            )}
          </div>
        ) : (
          <div>
            <span className="text-red-500">
              กรุณารอเจ้าหน้าที่กำหนดค่าไฟฟ้า และ ค่าน้ำ
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
