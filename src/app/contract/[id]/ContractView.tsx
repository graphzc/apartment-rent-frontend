"use client";

import useBookingV2 from "@/api/booking/useBookingV2";
import useApartment from "@/api/apartment/useApartment";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import {
  DocumentTextIcon,
  PrinterIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  HomeIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

interface ContractViewProps {
  id: string;
}

const ContractView = ({ id }: ContractViewProps) => {
  const { data: booking, isPending, error } = useBookingV2(id);
  const { data: apartment } = useApartment(booking?.apartmentInfo.id || "");
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateDuration = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const monthDiff =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    return monthDiff;
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">กำลังโหลด...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
        <button
          onClick={() => router.back()}
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          กลับ
        </button>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">ไม่พบข้อมูลการจอง</p>
        <button
          onClick={() => router.back()}
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          กลับ
        </button>
      </div>
    );
  }

  const duration = calculateDuration(booking.startDate, booking.endDate);

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Action Buttons - Hidden when printing */}
      <div className="print:hidden mb-6 flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <ArrowDownTrayIcon className="h-5 w-5 rotate-90" />
          กลับ
        </button>
        <div className="flex gap-4">
          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <PrinterIcon className="h-5 w-5" />
            พิมพ์
          </button>
        </div>
      </div>

      {/* Contract Content - A4 Size */}
      <div
        ref={printRef}
        className="bg-white shadow-lg print:shadow-none"
        style={{
          width: "210mm",
          minHeight: "297mm",
          margin: "0 auto",
          padding: "20mm",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {/* Header */}
        <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HomeIcon className="h-12 w-12 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                ระบบจัดการอพาร์ทเม้นท์
              </h1>
              <p className="text-gray-600">Apartment Management System</p>
            </div>
          </div>
          <div className="bg-blue-100 inline-flex items-center px-6 py-2 rounded-full">
            <DocumentTextIcon className="h-6 w-6 text-blue-600 mr-2" />
            <span className="text-blue-800 font-semibold text-lg">
              สัญญาเช่าห้องพัก / RENTAL CONTRACT
            </span>
          </div>
        </div>

        {/* Contract Info */}
        <div className="text-center mb-8">
          <p className="text-lg font-semibold">ทำที่: ระบบเช่าห้องพักออนไลน์</p>
          <p>วันที่: {formatDateShort(new Date().toISOString())}</p>
        </div>

        {/* Parties Information */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              ข้อมูลผู้ให้เช่า (ผู้ให้เช่า)
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600">ชื่อ:</span>
                <span className="font-semibold ml-2">เจ้าของอาคาร</span>
              </div>
              <div>
                <span className="text-gray-600">ที่อยู่:</span>
                <span className="ml-2">ที่อยู่อาคาร</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              ข้อมูลผู้เช่า
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600">ชื่อ:</span>
                <span className="font-semibold ml-2">
                  {booking.userInfo.name}
                </span>
              </div>
              <div>
                <span className="text-gray-600">อีเมล:</span>
                <span className="ml-2">{booking.userInfo.email}</span>
              </div>
              <div>
                <span className="text-gray-600">เบอร์โทรศัพท์:</span>
                <span className="ml-2">{booking.userInfo.telephone}</span>
              </div>
              <div>
                <span className="text-gray-600">ที่อยู่:</span>
                <span className="ml-2">{booking.userInfo.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rental Details */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            รายละเอียดการเช่า
          </h3>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600 font-medium">
                    อพาร์ตเมนต์:
                  </span>
                  <span className="ml-2 font-semibold">
                    {booking.apartmentInfo.name}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">
                    หมายเลขห้อง:
                  </span>
                  <span className="ml-2 font-semibold">
                    {booking.roomInfo.no}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">
                    ที่อยู่ห้อง:
                  </span>
                  <span className="ml-2">{booking.roomInfo.address}</span>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">
                    วันเริ่มเช่า:
                  </span>
                  <span className="ml-2 font-semibold">
                    {formatDateShort(booking.startDate.toString())}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">
                    วันสิ้นสุดการเช่า:
                  </span>
                  <span className="ml-2 font-semibold">
                    {formatDateShort(booking.endDate.toString())}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">
                    ระยะเวลาการเช่า:
                  </span>
                  <span className="ml-2 font-semibold">{duration} เดือน</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600 font-medium">
                    ค่าเช่าต่อเดือน:
                  </span>
                  <span className="ml-2 font-semibold text-green-600">
                    {formatCurrency(booking.price.monthlyRent)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">เงินประกัน:</span>
                  <span className="ml-2 font-semibold text-blue-600">
                    {formatCurrency(booking.price.securityDeposit)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">ค่าน้ำ:</span>
                  <span className="ml-2">
                    {formatCurrency(booking.price.plumbingPrice)} ต่อหน่วย
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">ค่าไฟ:</span>
                  <span className="ml-2">
                    {formatCurrency(booking.price.electricityPrice)} ต่อหน่วย
                  </span>
                </div>
                <div className="pt-2 border-t">
                  <span className="text-gray-600 font-medium">
                    ยอดชำระครั้งแรก:
                  </span>
                  <span className="ml-2 font-bold text-purple-600 text-lg">
                    {formatCurrency(booking.price.totalFirstPay)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contract Terms */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            เงื่อนไขการเช่า
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>ผู้เช่าต้องชำระค่าเช่าภายในวันที่ 5 ของทุกเดือน</li>
            <li>ผู้เช่าต้องวางเงินประกันการเช่า 2 เดือน</li>
            <li>ห้ามนำสัตว์เลี้ยงเข้ามาในห้องพัก</li>
            <li>ห้ามทำการปรับปรุงแก้ไขห้องพักโดยไม่ได้รับอนุญาต</li>
            <li>ผู้เช่าต้องรักษาความสะอาดและความเป็นระเบียบของห้องพัก</li>
            <li>
              การใช้เครื่องใช้ไฟฟ้าที่มีกำลังสูงต้องได้รับอนุญาตจากผู้ให้เช่า
            </li>
            <li>ห้ามก่อกวนเพื่อนบ้านและสร้างเสียงดังในเวลากลางคืน</li>
            <li>
              ผู้เช่าต้องแจ้งให้ผู้ให้เช่าทราบหากต้องการยกเลิกสัญญาล่วงหน้า 30
              วัน
            </li>
            <li>การผิดสัญญาจะมีการคิดค่าปรับตามข้อกำหนด</li>
            <li>ผู้ให้เช่าขอสงวนสิทธิ์ในการเข้าตรวจสอบห้องพักในกรณีจำเป็น</li>
          </ol>
        </div>

        {/* Payment Terms */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            การชำระเงิน
          </h3>
          <div className="text-sm space-y-2">
            <p>ผู้เช่าจะต้องชำระเงินค่าเช่าและเงินประกันก่อนเข้าพักจริง</p>
            <p>การชำระเงินสามารถทำได้ผ่านระบบออนไลน์หรือโอนเงินตามที่ระบุ</p>
            <p>ค่าน้ำและค่าไฟจะคิดตามการใช้จริงในแต่ละเดือน</p>
          </div>
        </div>

        {/* Contract Period */}
        <div className="mb-8">
          <div className="text-center border-t border-b py-4">
            <p className="text-lg font-bold">
              สัญญานี้มีผลบังคับใช้ตั้งแต่วันที่{" "}
              {formatDateShort(booking.startDate.toString())} ถึงวันที่{" "}
              {formatDateShort(booking.endDate.toString())}
            </p>
          </div>
        </div>

        {/* Contract Status */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            สถานะสัญญา
          </h3>
          <div
            className={`p-4 rounded-lg border-2 ${
              booking.isAcceptedContract
                ? "bg-green-50 border-green-200"
                : "bg-yellow-50 border-yellow-200"
            }`}
          >
            <div className="flex items-center">
              <CheckCircleIcon
                className={`h-6 w-6 mr-3 ${
                  booking.isAcceptedContract
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              />
              <div>
                <p
                  className={`font-semibold ${
                    booking.isAcceptedContract
                      ? "text-green-800"
                      : "text-yellow-800"
                  }`}
                >
                  {booking.isAcceptedContract
                    ? "สัญญาได้รับการยอมรับแล้ว"
                    : "รอการยอมรับสัญญา"}
                </p>
                <p
                  className={`text-sm ${
                    booking.isAcceptedContract
                      ? "text-green-700"
                      : "text-yellow-700"
                  }`}
                >
                  {booking.isAcceptedContract
                    ? "ผู้เช่าได้ยอมรับเงื่อนไขในสัญญาเช่าแล้ว"
                    : "รอผู้เช่ายอมรับเงื่อนไขในสัญญาเช่า"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            หมายเหตุ
          </h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• สัญญานี้เป็นหลักฐานการตกลงเช่าห้องพักที่สมบูรณ์</p>
            <p>• กรุณาเก็บสัญญานี้ไว้เป็นหลักฐาน</p>
            <p>• หากมีข้อสงสัยกรุณาติดต่อฝ่ายบริการลูกค้า</p>
            <p>• การจอง ID: {booking.id}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 mt-12">

          <div className="text-center mt-8 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              สัญญานี้สร้างโดยระบบจัดการอพาร์ทเม้นท์อัตโนมัติ
            </p>
            <p className="text-xs text-gray-500">
              Generated on {formatDate(new Date().toISOString())}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractView;
