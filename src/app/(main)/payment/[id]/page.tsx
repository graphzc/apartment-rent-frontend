'use client'
import useUploadSlip from "@/api/payment/useUploadSlip";
import PaymentForm from "@/components/payment/PaymentForm";
import PaymentInfo from "@/components/payment/PaymentInfo";
import Payment from "@/interface/Payment";
import { useParams, useRouter } from "next/navigation";

export default function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const uploadSlipMutate = useUploadSlip();

  const handleUploadSlip = async (data: any) => {
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('slip', data['slip'][0]);
    await uploadSlipMutate.mutateAsync(formData); 
    router.back();
  }
  
  return (
    <>
      <div className="w-100 relative text-center">
        <img
          src="/homeAsset/money.jpg"
          className="object-cover h-96 w-screen"
        />
        <div className="h-full w-full top-1/2 absolute -translate-y-1/2 p-8 bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/0 text-center ">
          <div className="text-5xl font-bold text-white mt-36">การชำระเงิน</div></div>
      </div>
      <div className="container mx-auto mb-44">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mt-10 rounded-lg">
          <img
            src="/homeAsset/QR.jpg"
            className="object-contain h-[80vh] w-screen "
          />

          <div>
            <PaymentInfo id={parseInt(id)} />
            <div className="text-xl font-bold mt-3 text-black">
              ธนาคารกสิกรไทย
            </div>
            <p className="text-gray-600 text-xl">เลขที่บัญชี : 049-8-29743-9</p>

            <p className="text-gray-600 text-xl">ชื่อ : นายพัสกร ศรีบุญเจริญ</p>

            <PaymentForm id={parseInt(id)} handleUpload={handleUploadSlip} />
          </div>
        </div>
      </div>
    </>
  );
}
