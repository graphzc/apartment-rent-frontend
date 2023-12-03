
export default function Map() {
  return (
    <>
      <div className="w-100 relative text-center">
        <img
          src="/homeAsset/location.PNG"
          className="object-cover h-96 w-screen "
        />
        <div className="h-full w-full top-1/2 absolute -translate-y-1/2 p-8 bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/0 text-center ">
          <div className="text-5xl font-bold text-white mt-36">สถานที่ตั้ง</div></div>
      </div>
      <div className="container mx-auto mb-44">

        <div className="text-3xl font-bold my-10 text-black text-center sm:text-left">
          แผนที่
        </div>

        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31017.064648076102!2d100.95684360614905!3d13.649667604549986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d400ba99f02df%3A0x403d84ae1b4d5e0!2z4LiV4Liz4Lia4LilIOC5gOC4l-C4nuC4o-C4suC4iiDguK3guLPguYDguKDguK3guJrguYnguLLguJnguYLguJ7guJjguLTguYwg4LiJ4Liw4LmA4LiK4Li04LiH4LmA4LiX4Lij4Liy!5e0!3m2!1sth!2sth!4v1696007956245!5m2!1sth!2sth" style={{ width: "100%", height: "700px" }} className='rounded-md'></iframe>

      </div>
    </>
  );
}
