"use client";

import { useRouter } from "next/navigation";
import UtilityForm from "@/components/admin/v2/UtilityForm";
import useCreateAdminUtility from "@/api/utility/useCreateAdminUtility";
import { CreateUtilityRequest } from "@/interface/requests/UtilityRequest";

const CreateUtilityPage = () => {
  const router = useRouter();
  const createUtility = useCreateAdminUtility();

  const handleSubmit = async (data: CreateUtilityRequest) => {
    try {
      await createUtility.mutateAsync(data);
      router.push("/adminv2/utilities");
    } catch (error) {
      // Error is handled in the hook
      console.error("Failed to create utility:", error);
    }
  };

  const handleCancel = () => {
    router.push("/adminv2/utilities");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          เพิ่มข้อมูลสาธารณูปโภคใหม่
        </h1>
        <p className="text-gray-600 mt-1">
          เพิ่มข้อมูลการใช้สาธารณูปโภคสำหรับการจองใหม่
        </p>
      </div>

      {/* Form */}
      <UtilityForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={createUtility.isPending}
      />
    </div>
  );
};

export default CreateUtilityPage;
