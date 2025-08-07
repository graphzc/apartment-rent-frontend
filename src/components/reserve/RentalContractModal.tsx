"use client";

import { useState } from "react";
import Room from "@/interface/Room";
import User from "@/interface/User";
import useApartment from "@/api/apartment/useApartment";

interface RentalContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  user: User;
  room: Room;
  formData: {
    userName: string;
    userEmail: string;
    userTelephone: string;
    userAddress: string;
    startDate: string;
    duration: number;
    endDate: string;
    roomId: string;
  };
}

export default function RentalContractModal({
  isOpen,
  onClose,
  onAccept,
  user,
  room,
  formData,
}: RentalContractModalProps) {
  const [isAccepted, setIsAccepted] = useState(false);

  const { data: apartment, isPending, error } = useApartment(room.apartmentId);
  if (!isOpen) return null;

  if (isPending) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="text-white">กำลังโหลดข้อมูล...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="text-red-600">เกิดข้อผิดพลาดในการโหลดข้อมูล</div>
      </div>
    );
  }

  // Validate required fields
  const isFormDataValid = () => {
    return (
      formData.userName?.trim() &&
      formData.userEmail?.trim() &&
      formData.userTelephone?.trim() &&
      formData.userAddress?.trim() &&
      formData.startDate &&
      formData.duration > 0
    );
  };

  // If form data is invalid, show error message
  if (!isFormDataValid()) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h2 className="text-xl font-bold mb-4 text-red-600">
            ข้อมูลไม่ครบถ้วน
          </h2>
          <p className="mb-4">กรุณากรอกข้อมูลให้ครบถ้วนก่อนดูสัญญาเช่า:</p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            {!formData.userName?.trim() && <li>ชื่อผู้เช่า</li>}
            {!formData.userEmail?.trim() && <li>อีเมล</li>}
            {!formData.userTelephone?.trim() && <li>เบอร์โทรศัพท์</li>}
            {!formData.userAddress?.trim() && <li>ที่อยู่</li>}
            {!formData.startDate && <li>วันเริ่มต้น</li>}
            {formData.duration <= 0 && <li>ระยะเวลาการเช่า</li>}
          </ul>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            ตกลง
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const monthlyRent = room.monthlyPrice || 0;
  const deposit = room.securityDeposit || monthlyRent * 2; // Use security deposit or 2 months rent

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-center flex-1">
            สัญญาเช่าห้องพัก
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 text-sm leading-relaxed">
          <div className="text-center mb-6">
            <p>ทำที่: ระบบเช่าห้องพักออนไลน์</p>
            <p>วันที่: {formatDate(new Date().toISOString())}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-2">
                ข้อมูลผู้ให้เช่า (ผู้ให้เช่า)
              </h4>
              <p>
                <strong>ชื่อ:</strong> เจ้าของอาคาร
              </p>
              <p>
                <strong>ที่อยู่:</strong> ที่อยู่อาคาร
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">ข้อมูลผู้เช่า</h4>
              <p>
                <strong>ชื่อ:</strong> {formData.userName}
              </p>
              <p>
                <strong>อีเมล:</strong> {formData.userEmail}
              </p>
              <p>
                <strong>เบอร์โทรศัพท์:</strong> {formData.userTelephone}
              </p>
              <p>
                <strong>ที่อยู่:</strong> {formData.userAddress}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">รายละเอียดการเช่า</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>หมายเลขห้อง:</strong> {room.no}
                </p>
                <p>
                  <strong>วันเริ่มเช่า:</strong>{" "}
                  {formatDate(formData.startDate)}
                </p>
                <p>
                  <strong>วันสิ้นสุดการเช่า:</strong>{" "}
                  {formatDate(formData.endDate)}
                </p>
                <p>
                  <strong>ระยะเวลาการเช่า:</strong> {formData.duration} เดือน
                </p>
              </div>
              <div>
                <p>
                  <strong>ค่าเช่าต่อเดือน:</strong>{" "}
                  {monthlyRent.toLocaleString()} บาท
                </p>
                <p>
                  <strong>เงินประกัน:</strong> {deposit.toLocaleString()} บาท
                </p>
                <p>
                  <strong>ค่าน้ำ:</strong> {apartment.plumbingPrice} บาท/หน่วย
                </p>
                <p>
                  <strong>ค่าไฟ:</strong> {apartment.electricityPrice} บาท/หน่วย
                </p>
                <p>
                  <strong>ยอดชำระครั้งแรก:</strong>{" "}
                  {(monthlyRent + deposit).toLocaleString()} บาท
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">เงื่อนไขการเช่า</h4>
            <ol className="list-decimal list-inside space-y-2">
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

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">การชำระเงิน</h4>
            <p>ผู้เช่าจะต้องชำระเงินค่าเช่าและเงินประกันก่อนเข้าพักจริง</p>
            <p>การชำระเงินสามารถทำได้ผ่านระบบออนไลน์หรือโอนเงินตามที่ระบุ</p>
          </div>

          <div className="border-t pt-4">
            <p className="text-center">
              <strong>
                สัญญานี้มีผลบังคับใช้ตั้งแต่วันที่{" "}
                {formatDate(formData.startDate)}{" "}
                ถึงวันที่ {formatDate(formData.endDate)}
              </strong>
            </p>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex items-center space-x-3 mb-4">
            <input
              type="checkbox"
              id="acceptContract"
              checked={isAccepted}
              onChange={(e) => setIsAccepted(e.target.checked)}
              className="w-4 h-4 text-blue-600"
            />
            <label htmlFor="acceptContract" className="text-sm">
              ข้าพเจ้าได้อ่านและเข้าใจในเงื่อนไขของสัญญาเช่าแล้ว
              และยินยอมปฏิบัติตามเงื่อนไขดังกล่าว
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              onClick={() => {
                if (isAccepted) {
                  onAccept();
                }
              }}
              disabled={!isAccepted}
              className={`px-4 py-2 rounded transition-colors ${
                isAccepted
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              ยอมรับและดำเนินการต่อ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
