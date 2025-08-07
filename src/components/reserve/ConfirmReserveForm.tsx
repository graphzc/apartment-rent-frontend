import { CreateBookingForm } from "@/interface/Booking";
import Room from "@/interface/Room";
import User, { UserInfo } from "@/interface/User";
import { useForm, useWatch } from "react-hook-form";
import { useMemo } from "react";



interface ConfirmReserveFormProps {
  user: User;
  room: Room;
  isLoading: boolean;
  onSubmit: (data: any) => void;
  onShowContract: (data: CreateBookingForm & { endDate: string }) => void;
}

export default function ConfirmReserveForm({
  user,
  room,
  isLoading,
  onSubmit,
  onShowContract,
}: ConfirmReserveFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateBookingForm>({
    defaultValues: {
      userName: user.name || "",
      userTelephone: user.telephone || "",
      userEmail: user.email || "",
      userAddress: "",
      roomId: room.id,
      startDate: new Date().toISOString().substring(0, 10),
      duration: 6,
    },
  });

  const startDate = useWatch({ control, name: "startDate" });
  const duration = useWatch({ control, name: "duration" });

  const endDate = useMemo(() => {
    if (startDate && duration) {
      const start = new Date(startDate);
      const end = new Date(start);
      end.setMonth(end.getMonth() + duration);
      return end.toISOString();
    }
    return "";
  }, [startDate, duration]);

  const handleFormSubmit = (data: CreateBookingForm) => {
    // Additional validation to ensure all required fields are filled
    if (
      !data.userName?.trim() ||
      !data.userEmail?.trim() ||
      !data.userTelephone?.trim() ||
      !data.userAddress?.trim()
    ) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const formattedData = {
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: endDate,
    };
    onShowContract(formattedData);
  };

  console.log(user);
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <input type="hidden" {...register("roomId")} />

      <div className="mb-4">
        <div>
          <b>
            ชื่อผู้เช่า <span className="text-red-500">*</span> :
          </b>
        </div>
        <input
          type="text"
          className="input-primary"
          placeholder="กรุณากรอกชื่อ-นามสกุล"
          {...register("userName", {
            required: "กรุณากรอกชื่อผู้เช่า",
            minLength: {
              value: 2,
              message: "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร",
            },
          })}
        />
        {errors.userName && (
          <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>
        )}
      </div>

      <div className="mb-4">
        <div>
          <b>
            อีเมล <span className="text-red-500">*</span> :
          </b>
        </div>
        <input
          type="email"
          className="input-primary"
          placeholder="example@email.com"
          {...register("userEmail", {
            required: "กรุณากรอกอีเมล",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "รูปแบบอีเมลไม่ถูกต้อง",
            },
          })}
        />
        {errors.userEmail && (
          <p className="text-red-500 text-sm mt-1">
            {errors.userEmail.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <div>
          <b>
            เบอร์โทรศัพท์ <span className="text-red-500">*</span> :
          </b>
        </div>
        <input
          type="tel"
          className="input-primary"
          placeholder="0xx-xxx-xxxx"
          {...register("userTelephone", {
            required: "กรุณากรอกเบอร์โทรศัพท์",
            pattern: {
              value: /^[0-9-+().\s]+$/,
              message: "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง",
            },
            minLength: {
              value: 9,
              message: "เบอร์โทรศัพท์ต้องมีอย่างน้อย 9 ตัวเลข",
            },
          })}
        />
        {errors.userTelephone && (
          <p className="text-red-500 text-sm mt-1">
            {errors.userTelephone.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <div>
          <b>
            ที่อยู่ <span className="text-red-500">*</span> :
          </b>
        </div>
        <textarea
          className="input-primary"
          rows={3}
          placeholder="กรุณากรอกที่อยู่ปัจจุบัน"
          {...register("userAddress", {
            required: "กรุณากรอกที่อยู่",
            minLength: {
              value: 10,
              message: "ที่อยู่ต้องมีรายละเอียดอย่างน้อย 10 ตัวอักษร",
            },
          })}
        />
        {errors.userAddress && (
          <p className="text-red-500 text-sm mt-1">
            {errors.userAddress.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <div>
          <b>
            วันเริ่มต้น <span className="text-red-500">*</span>
          </b>
        </div>
        <input
          type="date"
          className="input-primary"
          min={new Date().toISOString().split("T")[0]}
          {...register("startDate", { required: "กรุณาเลือกวันเริ่มต้น" })}
        />
        {errors.startDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.startDate.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <div>
          <b>
            จำนวนเดือน <span className="text-red-500">*</span>
          </b>
        </div>
        <select
          className="input-primary"
          {...register("duration", { required: "กรุณาเลือกระยะเวลา" })}
        >
          <option value={6}>6 เดือน</option>
          <option value={12}>12 เดือน</option>
          <option value={18}>18 เดือน</option>
        </select>
        {errors.duration && (
          <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
        )}
      </div>

      {endDate && (
        <div className="mb-4">
          <div>
            <b>วันสิ้นสุด:</b> {new Date(endDate).toLocaleDateString("th-TH")}
          </div>
        </div>
      )}

      <div className="mb-4">
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "กำลังส่ง..." : "ดูสัญญาเช่า"}
        </button>
      </div>
    </form>
  );
}
