'use client'
import Image from "next/image";
import {
  Carousel,
} from "@material-tailwind/react";

export default function Home() {
  const imgs: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <>
      <div className="w-100 relative text-center">
        <img
          src="/homeAsset/colonial-style-building.jpg"
          className="object-cover h-96 w-screen "
        />
        <div className="h-full w-full top-1/2 absolute -translate-y-1/2 p-8 bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/0 text-center ">
          <div className="text-5xl font-bold text-white mt-36">ซ้งศรีเจริญ ยินดีต้อนรับ</div></div>
      </div>
      <div className="container mx-auto mb-44">

        <div className="text-3xl font-bold my-10 text-black text-center sm:text-left">
          บริเวณภายในที่พักและโดยรอบ
        </div>

        <Carousel
          className="rounded-xl bg-black my-5 sm:px-0 px-5"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                    }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          {imgs.map((data: number, index: number) => (
            <img key={index} src={"/homeAsset/" + data + ".jpg"} alt={"image " + data} className="h-full sm:max-h-[600px] max-h-[300px] w-full object-contain " />
          ))}
        </Carousel>

        <div className="text-2xl font-bold my-5 text-black text-center sm:text-left">
          รายละเอียด
        </div>
        <div className="grid grid-cols-3 gap-4">
          <p className="text-gray-600 text-lg">
            - 1 ห้องนอน
            <br />
            - 1 ห้องน้ำ
            <br />
          </p>
          <p className="text-gray-600 text-lg">
            - ค่าน้ำ คิดตามจริง
            <br />
            - ค่าไฟ คิดตามจริง
            <br />
          </p>
          <p className="text-gray-600 text-lg font-bold">
            ราคา 3,500 บาท/เดือน
          </p>
        </div>



        <div className="text-3xl font-bold my-10 text-black text-center sm:text-left">
          สถานที่บริเวณใกล้เคียงที่พัก
        </div>

        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 sm:gap-7 sm:px-0  gap-y-5 grid-cols-1 px-5">
          {/* Card */}
          <div className="rounded overflow-hidden shadow-lg transition hover:duration-300 hover:scale-105 mb-2 ">
            <img className="w-full" src="/homeAsset/seven.jpg" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl text-gray-800 mb-2">
                Seven-Eleven
              </div>
              <p className="text-gray-600 text-base">
                หน้าปากซอยมี 7-11
                <br />
                <br />
                <br />
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #Seven-Eleven
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #mouth of the sideroad
              </span>
            </div>
          </div>

          <div className=" rounded overflow-hidden shadow-lg transition hover:duration-300 hover:scale-105 mb-2 ">
            <img className="w-full" src="/homeAsset/market.jpg" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl text-gray-800 mb-2">Market</div>
              <p className="text-gray-600 text-base">
                จาก 7-11 ตรงไปอีก 1 กิโลเมตร
                <br />
                จะมีตลาดคลองสวน ซึ่งเป็นตลาดที่เก่าแก่ที่สุดในจังหวัดฉะเชิงเทรา
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #100 year market
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #one kilometer
              </span>
            </div>
          </div>

          <div className=" rounded overflow-hidden shadow-lg transition hover:duration-300 hover:scale-105 mb-2 ">
            <img className="w-full" src="/homeAsset/robinson.jpg" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl text-gray-800 mb-2">
                Robinson Life Style
              </div>
              <p className="text-gray-700 text-base">
                ห่างจากโรบินสันฉะเชิงเทราเพียง 14 กิโลเมตร
                <br />
                <br />
                <br />
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #Robinson
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #fourteen kilometer
              </span>
            </div>
          </div>

          <div className=" rounded overflow-hidden shadow-lg transition hover:duration-300 hover:scale-105 mb-2 ">
            <img className="w-full" src="/homeAsset/makro.jpg" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl text-gray-800 mb-2">Makro</div>
              <p className="text-gray-700 text-base">
                ห่างจากแม็คโครฉะเชิงเทราเพียง 18 กิโลเมตร
                <br />
                <br />
                <br />
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #Makro
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #eighteen kilometer
              </span>
            </div>
          </div>

          <div className=" rounded overflow-hidden shadow-lg transition hover:duration-300 hover:scale-105 mb-2 ">
            <img className="w-full" src="/homeAsset/bigc.jpg" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl text-gray-800 mb-2">Big C</div>
              <p className="text-gray-700 text-base">
                ห่างจากบิ๊กซีฉะเชิงเทราเพียง 16 กิโลเมตร
                <br />
                <br />
                <br />
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #Big C
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #sixteen kilometer
              </span>
            </div>
          </div>

          <div className=" rounded overflow-hidden shadow-lg transition hover:duration-300 hover:scale-105 mb-2 ">
            <img className="w-full" src="/homeAsset/thaiwatsadu.jpg" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl text-gray-800 mb-2">
                Thaiwatsadu
              </div>
              <p className="text-gray-700 text-base">
                ห่างจากไทวัสดุฉะเชิงเทราเพียง 13 กิโลเมตร
                <br />
                <br />
                <br />
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #Thaiwatsadu
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #thirteen kilometer
              </span>
            </div>
          </div>

          <div className=" rounded overflow-hidden shadow-lg transition hover:duration-300 hover:scale-105 mb-2 ">
            <img className="w-full" src="/homeAsset/homepro.jpg" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl text-gray-800 mb-2">
                HomePro
              </div>
              <p className="text-gray-700 text-base">
                ห่างจากโฮมโปรฉะเชิงเทราเพียง 17 กิโลเมตร
                <br />
                <br />
                <br />
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #HomePro
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #seventeen kilometer
              </span>
            </div>
          </div>



        </div>
      </div>
    </>
  );
}
