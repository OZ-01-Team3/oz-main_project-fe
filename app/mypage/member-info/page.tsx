import AuthInput from "@/components/AuthInput"
import CommonButton from "@/components/CommonButton"
import { UserCircleIcon } from "@heroicons/react/16/solid"


const memberInfo = () => {
  return (
    <div className="w-full  ml-20 mt-5 md:ml-8 sm:ml-6 ">
      <div className="flex flex-col">
        <UserCircleIcon className=" h-52 w-52  sm:w-32 sm:h-32 text-gray-300" aria-hidden="true" />
        <div className="sm:flex sm:justify-center">
          <CommonButton className="w-52 rounded-lg bg-transparent px-3.5 py-2.5  text-mainWhite shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6 border-2 border-mainWhite ">사진 등록</CommonButton>
          <CommonButton className="w-full h-12 hidden sm:block rounded-lg bg-mainWhite px-3.5 py-2.5 mt-6 text-base font-base text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:ml-4">내정보 수정</CommonButton>

        </div>
      </div>

      <div className="flex flex-col">
        <AuthInput>Email</AuthInput>
        <AuthInput>Nickname</AuthInput>
        <AuthInput>Phone</AuthInput>
        <AuthInput>Password</AuthInput>
        <AuthInput>Email</AuthInput>
        <CommonButton className="w-full h-12 rounded-lg bg-mainWhite px-3.5 py-2.5 mt-6 text-base font-base text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:hidden">내정보 수정</CommonButton>
        <CommonButton className="w-full h-12 rounded-lg bg-mainWhite px-3.5 py-2.5 mt-6 text-base font-base text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hidden sm:block">로그아웃</CommonButton>
      </div>
      <div className="w-full flex justify-end mt-6">

        <CommonButton className=" text-sm text-mainWhite ">회원탈퇴</CommonButton>
      </div>

    </div>
  )
}

export default memberInfo