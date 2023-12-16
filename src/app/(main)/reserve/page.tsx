"use client";
import { HomeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import {
  Fragment,
  useRef,
  useState,
  useCallback,
  MouseEventHandler,
  useEffect,
} from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Reserve() {
  const imgs: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const [open, setOpen] = useState(false);
  const [id_nows, setId] = useState("");
  const [id_list, setList] = useState([""]);
  const cancelButtonRef = useRef(null);

  useEffect(() => { }, [id_list]);

  const click_reserve = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
    setId(event.currentTarget.id);
  };

  const confirm = () => {
    id_list.push(id_nows);
    id_list.forEach((id) => {
      var ele = document.getElementById(id);
      ele?.classList.toggle("transition");
      ele?.classList.toggle("hover:duration-300");
      ele?.classList.toggle("hover:scale-105");
      ele?.classList.toggle("bg-gray-100");
      ele?.classList.toggle("text-gray-800");

      ele?.classList.toggle("bg-red-900");
      ele?.classList.toggle("text-white");
    });
    setOpen(false);
  };

  const Modal = () => {
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                      </div> */}
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-xl  font-semibold leading-6 text-gray-900"
                        >
                          ยืนยันการจองห้องพัก
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-lg text-gray-500">
                            หากต้องการจองห้องพัก จะต้องชำระเงินภายใน 1 วัน
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-900 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto"
                      onClick={(e) => {
                        confirm();
                      }}
                    >
                      จองห้องพัก
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      ยกเลิก
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  };

  const Cards = () => {
    let html: JSX.Element[] = [];
    for (let i = 0; i < 60; i++) {
      if (i % 17 == 0 || i % 27 == 0 || id_list.includes("card" + i)) {
        html.push(
          <button
            id={"card" + i}
            key={i}
            className="rounded overflow-hidden shadow-xl mb-2 bg-red-900 text-white"
            onClick={(event) => click_reserve(event)}
          >
            <div className="px-6 py-4 text-center ">
              <div className="flex justify-center items-center">
                <HomeIcon className="h-6 w-6 " />
              </div>
              <div className="font-bold text-xl my-3">{101 + i}</div>
              <p id={"card" + i + "p"} className="text-base">
                ไม่ว่าง
              </p>
            </div>
          </button>
        );
      } else {
        html.push(
          <button
            id={"card" + i}
            key={i}
            className="rounded overflow-hidden shadow-xl mb-2 bg-gray-100 transition hover:duration-300 hover:scale-105 text-gray-800"
            onClick={(event) => click_reserve(event)}
          >
            <div className="px-6 py-4 text-center">
              <div className="flex justify-center items-center">
                <HomeIcon className="h-6 w-6 " />
              </div>
              <div className="font-bold text-xl my-3">{101 + i}</div>
              <p id={"card" + i + "p"} className=" text-base">
                ห้องว่าง
              </p>
            </div>
          </button>
        );
      }
    }
    return html;
  };

  return (
    <>
      <Modal />
      <div className="w-100 relative text-center">
        <img src="/homeAsset/2.jpg" className="object-cover h-96 w-screen " />
        <div className="h-full w-full top-1/2 absolute -translate-y-1/2 p-8 bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/0 text-center ">
          <div className="text-5xl font-bold text-white mt-36">จองห้องพัก</div>
        </div>
      </div>
      <div className="container mx-auto mb-44">
        <div className="text-3xl font-bold my-10 text-black text-center sm:text-left">
          ห้องพักทั้งหมด
        </div>

        <div className="grid 2xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-4 sm:gap-7 gap-5 grid-cols-2 px-5">
          <Cards />
        </div>
      </div>
    </>
  );
}
