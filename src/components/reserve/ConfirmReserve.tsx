"use client";

import useRoom from "@/api/room/useRoom";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ConfirmReserveForm from "./ConfirmReserveForm";
import { CreateBookingForm, CreateBookingRequest } from "@/interface/Booking";
import useCreateBooking from "@/api/booking/useCreateBooking";
import MySwal from "@/lib/sweetAlert";
import { useState } from "react";
import RentalContractModal from "./RentalContractModal";

interface ConfirmReserveProps {
  id: string;
}

export default function ConfirmReserve({ id }: ConfirmReserveProps) {
  const { data: room, isLoading, error } = useRoom(id);
  const router = useRouter();
  const { data: user, status } = useSession();
  const mutation = useCreateBooking();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFormData, setCurrentFormData] = useState<any>(null);

  if (isLoading || status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">เกิดข้อผิดพลาดในการจอง</div>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }

  const handleShowContract = (data: any) => {
    setCurrentFormData(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentFormData(null);
  };

  const handleAcceptContract = async () => {
    if (!currentFormData) return;

    setIsModalOpen(false);

    // Convert the form data to the format expected by handleSubmit
    const bookingData: CreateBookingForm = {
      roomId: currentFormData.roomId,
      startDate: new Date(currentFormData.startDate).toISOString(),
      userName: currentFormData.userName,
      userEmail: currentFormData.userEmail,
      userTelephone: currentFormData.userTelephone,
      userAddress: currentFormData.userAddress,
      duration: currentFormData.duration,
    };

    await handleSubmit(bookingData);
  };

  const handleSubmit = async (data: CreateBookingForm) => {
    // Show confirmation dialog before submitting
    const result = await MySwal.fire({
      title: "ยืนยันการจอง",
      text: "คุณต้องการจองห้องพักนี้หรือไม่?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    });

    // If user cancels, return early
    if (!result.isConfirmed) {
      return;
    }

    data.roomId = room!.id!;

    const req: CreateBookingRequest = {
      userAddress: data.userAddress,
      userName: data.userName,
      userTelephone: data.userTelephone,
      userEmail: data.userEmail,
      startDate: new Date(data.startDate),
      // End date = start date + month x duration
      endDate: new Date(
        new Date(data.startDate).setMonth(
          new Date(data.startDate).getMonth() + data.duration
        )
      ),
      roomId: data.roomId,
    };

    const bookingResponse = await mutation.mutateAsync(req);
    if (bookingResponse) {
      MySwal.fire({
        title: "สำเร็จ",
        text: "การจองห้องพักสำเร็จ",
      });
    }

    router.replace("/reserve/my");
  };

  return (
    <div className="text-xl">
      <div className="mb-4">
        <b>เลขห้อง :</b> {room?.no}
      </div>
      <ConfirmReserveForm
        user={user?.user!}
        room={room!}
        isLoading={mutation.isPending}
        onSubmit={handleSubmit}
        onShowContract={handleShowContract}
      />

      {currentFormData && (
        <RentalContractModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAccept={handleAcceptContract}
          user={user?.user!}
          room={room!}
          formData={currentFormData}
        />
      )}
    </div>
  );
}
