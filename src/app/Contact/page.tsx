
export default function Contact() {
  return (
    <>
      <div className="w-100 relative text-center">
        <img
          src="/homeAsset/phone.jpg"
          className="object-cover h-96 w-screen "
        />
        <div className="h-full w-full top-1/2 absolute -translate-y-1/2 p-8 bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/0 text-center ">
          <div className="text-5xl font-bold text-white mt-36">ช่องทางการติดต่อ</div></div>
      </div>
      <div className="container mx-auto mb-44">

        <div className="text-3xl font-bold mt-10 my-5 text-black text-center sm:text-left">
          ติดต่อ
        </div>

        <div className="text-xl my-8 text-black text-center sm:text-left">ชื่อ - นามสกุล : นาย สุเทพ ศรีบุญเจริญ (เจ้าของกิจการ) </div>
        <div className="text-xl my-8 text-black text-center sm:text-left">โทรศัพท์ : 083-1111-627 </div>
        <div className="text-xl my-8 text-black text-center sm:text-left">ที่อยู่ : 46/4 หมู่4 ตำบลเทพราช อำเภอบ้านโพธิ์ จังหวัดฉะเชิงเทรา</div>

      </div>
    </>
  );
}
