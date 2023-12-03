
export default function Payment() {
  return (
    <>
      <div className="w-100 relative text-center">
        <img
          src="/homeAsset/money.jpg"
          className="object-cover h-96 w-screen"
        />
        <div className="h-full w-full top-1/2 absolute -translate-y-1/2 p-8 bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/0 text-center ">
          <div className="text-5xl font-bold text-white mt-36">ช่องทางการชำระเงิน</div></div>
      </div>
      <div className="container mx-auto mb-44">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mt-10 rounded-lg">
          <img
            src="/homeAsset/QR.jpg"
            className="object-contain h-[80vh] w-screen "
          />

          <div className="text-center m-auto">
            <div className="text-3xl font-bold my-10 text-black">
              ธนาคารกสิกรไทย
            </div>
            <p className="text-gray-600 text-xl">เลขที่บัญชี : 049-8-29743-9</p>

            <p className="text-gray-600 text-xl">ชื่อ : นายพัสกร ศรีบุญเจริญ</p>

            <form className="text-center mt-10 ">
              <label className="">
                <span className="sr-only">Choose File</span>
                <input type="file" accept="image/png, image/jpeg" className=" w-full text-lg text-slate-500 text-black bg-blue-gray-100 rounded-full
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-md
      file:bg-violet-50 file:text-violet-700
      hover:transition hover:duration-300 hover:scale-105
    "/>
              </label>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
