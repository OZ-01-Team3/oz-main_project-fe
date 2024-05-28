import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}


const WithdrawalModal = ({ isOpen, onClose, onConfirm }: WithdrawalModalProps) => {

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog className="relative z-10" onClose={onClose}>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-modalBg transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-[400px] sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-mainBlack">
                      회원탈퇴
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-customGray">
                        정말 탈퇴 하시겠어요?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 grid grid-flow-row-dense grid-cols-2 gap-x-3">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-shadow-sm ring-1 ring-inset ring-gray-300 text-mainBlack hover:bg-gray-50"
                    onClick={onClose}
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-mainBlack px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainBlack"
                    onClick={onConfirm}
                  >
                    탈퇴하기
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
export default WithdrawalModal;
