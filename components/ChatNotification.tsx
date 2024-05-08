'use client'

import chatData from "@/chatData";
import { ChatBubbleOvalLeftEllipsisIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import CommonButton from "./CommonButton";

interface ChatNotificationProps {
  isOpen: boolean;
  onClose: () => void;
}


const ChatNotification = ({ isOpen, onClose }: ChatNotificationProps) => {

  // 헤더에서 알림버튼 눌렀을때 뒤에꺼 스크롤 안되게 
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="relative">
      <div className="fixed top-0 right-0 z-50 w-[400px] h-screen h-min-100vh bg-white p-4 overflow-auto">
        <div className="flex flex-col border-b-[1px] border-mainBlack pb-1">
          <XMarkIcon className=" w-6 text-mainBlack cursor-pointer" onClick={onClose} />
          <p className="text-mainBlack text-xl font-semibold mt-4">알림</p>
        </div>
        <div className="flex mt-4">
          <CommonButton className="border border-mainBlack text-mainBlack rounded-full py-1 px-1.5 w-16 text-center focus:bg-mainBlack focus:text-mainWhite hover:bg-mainBlack hover:text-mainWhite cursor-pointer mr-1.5">전체</CommonButton>
          <CommonButton className="border border-mainBlack text-mainBlack rounded-full py-1 px-1.5 w-16 text-center focus:bg-mainBlack focus:text-mainWhite hover:bg-mainBlack hover:text-mainWhite cursor-pointer ">채팅</CommonButton>
        </div>

        <div className="flex flex-col mt-6">
          <p className="text-mainBlack font-semibold text-lg">새로운 알림이 있습니다.</p>
          <ul role="list" className="w-auto divide-y divide-gray-200 border-b border-gray-200">
            {chatData.map((product) => (
              <li key={product.id} className="flex py-6 items-center cursor-pointer">

                <div className="flex-shrink-0 mr-4 ">
                  <div className="p-2  border-mainBlack border rounded-full flex justify-center items-center">
                    <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8 text-mainBlack" />

                  </div>
                </div>

                <div className="flex flex-1 flex-col ">
                  <div>
                    <div className="flex justify-between">
                      <h4 className="text-base">
                        <a className="font-medium text-mainBlack">
                          {product.name}
                        </a>
                      </h4>
                      {/* <p className="ml-4 text-sm font-medium text-mainWhite">D-13</p> */}
                    </div>
                    <div className="mt-1 text-sm text-subGray">
                      {product.content.length > 50 ? `${product.content.substring(0, 50)}...` : product.content}
                    </div>
                    <div className="mt-1 text-sm text-subGray">

                      {product.time}</div>
                  </div>

                  {/* <div className="mt-4 flex flex-1 items-end justify-between">
                    <CommonButton className="flex items-center space-x-2 text-sm text-mainWhite border p-1.5 rounded-md">
                      대여중

                      <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                    </CommonButton>

                  </div> */}
                </div>

                <div className="flex-shrink-0">
                  <img
                    src={product.image}
                    // alt={product.imageAlt}
                    className="h-24 w-24 rounded-md object-cover object-center sm:h-20 sm:w-20 ml-4 border border-gray-200 "
                  />
                </div>

              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ChatNotification