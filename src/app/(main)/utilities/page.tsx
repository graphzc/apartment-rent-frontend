'use client'
import { HomeIcon } from '@heroicons/react/24/solid'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Utility() {
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)

  function Cards() {
    let html = [];
    for (let i = 0; i < 60; i++) {
      if (i % 17 == 0 || i % 27 == 0) {
        html.push(
          <div key={i} className="rounded overflow-hidden shadow-xl mb-2 bg-light-blue-900 transition hover:duration-300 hover:scale-105" onClick={() => setOpen(true)}>
            <div className="px-6 py-4 text-center ">
              <div className='flex justify-center items-center'><HomeIcon className="h-6 w-6 text-white" /></div>
              <div className="font-bold text-xl text-white my-3">
                {101 + i}
              </div>
              <p className="text-white text-base">
                ไม่ว่าง
              </p>
            </div>
          </div>)
      }
      else {
        html.push(
          <div key={i} className="rounded overflow-hidden shadow-xl mb-2 bg-gray-100  " >
            <div className="px-6 py-4 text-center ">
              <div className='flex justify-center items-center'><HomeIcon className="h-6 w-6 text-gray-800" /></div>
              <div className="font-bold text-xl text-gray-800 my-3">
                {101 + i}
              </div>
              <p className="text-gray-600 text-base">
                ห้องว่าง
              </p>
            </div>
          </div>)
      }
    }
    return html;
  }

  const Modal = () => {
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                      <div className="m-auto pt-10">
                        <Dialog.Title as="h3" className="text-3xl text-center font-semibold leading-6 text-gray-900">
                          ค่าใช้จ่าย ปัจจุบัน
                        </Dialog.Title>
                        <div className="container mt-16">
                          <div className="grid-container grid grid-cols-2 gap-4 text-black text-left m-5">
                            <div className="col text-2xl font-bold ">ค่าห้อง</div>
                            <div className="col text-xl ">3,500 บาท</div>
                          </div>

                          <div className="grid-container grid grid-cols-2 gap-4 text-black text-left m-5">
                            <div className="col text-2xl font-bold ">ค่าไฟ</div>
                            <div className="col text-xl ">1,294 บาท</div>
                          </div>

                          <div className="grid-container grid grid-cols-2 gap-4 text-black text-left m-5">
                            <div className="col text-2xl font-bold ">ค่าน้ำ</div>
                            <div className="col text-xl ">280 บาท</div>
                          </div>

                          <br />
                          <div className="grid-container grid grid-cols-2 gap-4 text-black text-left m-5 ">
                            <div className="col text-2xl font-bold ">รวมทั้งหมด</div>
                            <div className="col text-xl ">5,074 บาท</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      ปิด
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
  }

  return (
    <>
      <Modal />
      <div className="w-100 relative text-center">
        <img
          src="/homeAsset/light.jpg"
          className="object-cover h-96 w-screen"
        />
        <div className="h-full w-full top-1/2 absolute -translate-y-1/2 p-8 bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/0 text-center ">
          <div className="text-5xl font-bold text-white mt-36">สาธารณูโภค</div></div>
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
