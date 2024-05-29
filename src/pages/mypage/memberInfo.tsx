import { UserContext } from "@/App";
import { modificationUserInfoAPI, withdrawalAPI } from "@/api/authRequests";
import AuthInput from "@/components/AuthInput";
import WithdrawalModal from "@/components/mypage/WithdrawalModal";
import { UserCircleIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Cookies } from "react-cookie";
import { FormProvider, useForm } from "react-hook-form";
import Resizer from 'react-image-file-resizer';
import { z as zod } from 'zod';
const cookies = new Cookies();

const MemberInfo = () => {
  const { userData } = useContext(UserContext)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false); // 입력 필드 활성화 상태 
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  /**유효성 검증 */
  const userInfoModifyFormSchema = zod
    .object({
      email: zod.string(),
      password: zod.string().regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/,
        '문자와 특수문자, 숫자가 혼합된 8~20자리의 비밀번호를 입력해주세요.'
      )
        .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
        .max(20, { message: '비밀번호는 20자 이하여야 합니다.' })
        .optional().or(zod.literal(''))
      ,
      confirmPassword: zod.string().optional().or(zod.literal('')),
      nickname: zod.string().min(1, { message: '닉네임은 필수 입력값입니다.' }),
      phone: zod.string().regex(/^(\d{3}-\d{3,4}-\d{4})$/, '전화번호 형식이 유효하지 않습니다.'),
    })
    .refine(data => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: '비밀번호가 일치하지 않습니다.'
    })
    .refine(data => (data.password === '' && data.confirmPassword === '') || (data.password !== '' && data.confirmPassword !== ''), {
      path: ['password'],
      message: '비밀번호와 비밀번호 확인 필드는 동시에 비워두거나 동시에 입력해야 합니다.'
    });

  const form = useForm({
    resolver: zodResolver(userInfoModifyFormSchema),
    defaultValues: {
      email: userData.email,
      nickname: userData.nickname,
      password: '',
      confirmPassword: '',
      phone: userData.phone,
    },
    mode: 'onChange'
  })
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = form;


  /**회원 탈퇴 */
  const handleMemberWithdrawal = async () => {
    try {
      await withdrawalAPI();
      const allCookies = cookies.getAll();
      Object.keys(allCookies).forEach(cookieName => cookies.remove(cookieName));
      window.location.href = "/";
    } catch (error) {
      console.error("회원탈퇴 실패", error);
    }
  };

  /**회원정보 수정 */
  const handleModificationUserInfo = form.handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('nickname', data.nickname);
    formData.append('phone', data.phone);
    if (data.password) formData.append('password1', data.password);
    if (data.confirmPassword) formData.append('password2', data.confirmPassword);
    if (profileImage) formData.append('profile_img', profileImage);

    try {
      const response = await modificationUserInfoAPI(formData);
      console.log(response, '회원정보 수정 성공');
    } catch (error) {
      console.log('회원 정보 수정 실패', error);
    }
  });


  const resizeFile = (file: File): Promise<File> =>
    new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        'JPEG',
        100,
        0,
        (uri) => {
          if (uri instanceof File) {
            resolve(uri);
          } else {
            reject(new Error("크키가 조정된 파일 형식이 아님"));
          }
        },
        'file',
      );
    });

  /** 프로필 이미지 변경 핸들러 */
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      try {
        const resizedFile = await resizeFile(file);
        setProfileImage(resizedFile);
        setPreviewImageUrl(URL.createObjectURL(resizedFile));
      } catch (error) {
        console.error("이미지 크기조정 실패", error);
      }
    } else {
      setProfileImage(null);
      setPreviewImageUrl(null);
    }
  };

  useEffect(() => {
    if (userData.profile_img) {
      setPreviewImageUrl(userData.profile_img);
    }
  }, [userData.profile_img]);



  useEffect(() => {
    if (userData) {
      setValue('nickname', userData.nickname);
      setValue('phone', userData.phone);
      setValue('email', userData.email);
    }
  }, [userData, setValue]);


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleEdit = () => setIsEditable(!isEditable); // 수정 가능 상태를 토글함


  return (
    <>
      <WithdrawalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleMemberWithdrawal}
      />
      <FormProvider {...form}>
        <div className="w-full ml-20 mt-5 md:ml-8 sm:ml-6">
          <div className="flex flex-col">
            {previewImageUrl ? (
              <img src={previewImageUrl} alt="Profile Preview" className="h-52 w-52 sm:w-32 sm:h-32 rounded-full object-cover" />
            ) : (
              <UserCircleIcon className="h-52 w-52 sm:w-32 sm:h-32 text-gray-300 " aria-hidden="true" />
            )}
            {isEditable && (
              <div className="sm:flex">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profileImage"
                  onChange={handleImageChange}
                />
                <label htmlFor="profileImage" className="w-52 inline-block rounded-lg bg-transparent px-3.5 py-2.5 mt-6 text-mainWhite shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border border-mainWhite text-center cursor-pointer sm:w-full">사진 등록</label>

              </div>
            )}

          </div>

          <div className="flex flex-col">
            <form onSubmit={handleModificationUserInfo}>
              <AuthInput value={userData.email} disabled>Email</AuthInput>
              <AuthInput disabled={!isEditable} {...register('nickname')}>Nickname</AuthInput>
              {errors.nickname && <p className=" text-sm text-red-500 mt-1">{errors.nickname.message}</p>}
              <AuthInput disabled={!isEditable} {...register('phone')} placeholder="010-0000-0000">Phone</AuthInput>
              {errors.phone && <p className=" text-sm text-red-500 mt-1">{errors.phone.message}</p>}
              {isEditable &&
                <>
                  <AuthInput type="password" placeholder="새로운 비밀번호를 입력하세요" {...register('password')}>NewPassword</AuthInput>
                  {errors.password && <p className=" text-sm text-red-500 mt-1">{errors.password.message}</p>}
                  <AuthInput type="password" placeholder="비밀번호를 한번 더 입력하세요" {...register('confirmPassword')}>ConfirmPassword</AuthInput>
                  {errors.confirmPassword && <p className=" text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
                </>
              }
              <button
                className="w-full h-12 rounded-lg bg-mainWhite px-3.5 py-2.5 mt-6 text-base font-base text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={isEditable ? handleModificationUserInfo : toggleEdit}
                type={isEditable ? "submit" : "button"}
              >
                {isEditable ? '저장하기' : '내정보 수정'}
              </button>
            </form>
          </div>
          <div className="w-full flex justify-end mt-6">
            <button className="text-sm text-mainWhite" onClick={openModal}>회원탈퇴</button>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default MemberInfo;
