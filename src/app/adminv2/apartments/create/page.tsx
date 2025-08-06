"use client";

import { useRouter } from "next/navigation";
import ApartmentForm from "@/components/admin/v2/ApartmentForm";
import useCreateApartmentV2 from "@/api/apartment/useCreateApartmentV2";
import { CreateApartmentRequest } from "@/interface/requests/ApartmentV2Request";

const CreateApartmentPage = () => {
  const router = useRouter();
  const createApartment = useCreateApartmentV2();

  const handleSubmit = async (data: CreateApartmentRequest) => {
    try {
      await createApartment.mutateAsync(data);
      router.push("/adminv2/apartments");
    } catch (error) {
      // Error is handled in the hook
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          เพิ่มอพาร์ตเมนต์ใหม่
        </h1>
        <p className="text-gray-600 mt-1">เพิ่มอพาร์ตเมนต์ใหม่เข้าสู่ระบบ</p>
      </div>

      {/* Form */}
      <ApartmentForm
        onSubmit={handleSubmit}
        isLoading={createApartment.isPending}
        mode="create"
      />
    </div>
  );
};

export default CreateApartmentPage;
