
import { CameraIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import CommonButton from '../CommonButton';

interface ChatProps {
  sendMessage: (message: string, image?: string) => void;
}

const ChatInput = ({ sendMessage }: ChatProps) => {
  const [inputMessage, setInputMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (fileInputRef.current?.files?.[0]) {
      const file = fileInputRef.current.files[0];
      // 파일을 Base64로 인코딩
      const imageBase64 = await convertFileToBase64(file);
      sendMessage(inputMessage, imageBase64); // 이미지 데이터도 함께 전송
    }
    else {
      sendMessage(inputMessage);
    }
    setInputMessage(""); // 메시지 전송 후 입력 필드 초기화
    if (fileInputRef.current) fileInputRef.current.value = ''; // 파일 입력 초기화
  }

  // 파일을 Base64로 인코딩하는 함수
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result?.toString();
        if (base64String) {
          resolve(base64String);
        } else {
          reject(new Error("Failed to convert file to Base64"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file); // 파일을 Base64로 인코딩
    });
  }

  const handleCameraIconClick = () => {
    // 카메라 아이콘 클릭 시 파일 선택 창 열기
    fileInputRef.current?.click();
  }


  return (
    <div className="flex items-center justify-between pb-1 ">
      <div className="w-10 h-10 rounded-full flex justify-center items-center">
        <CameraIcon className="w-7 h-7 cursor-pointer" onClick={handleCameraIconClick} />
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={() => { }} />
      </div>
      <div className="flex flex-row justify-between rounded-full w-full">
        <input
          placeholder="메시지를 입력하세요."
          className="block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-mainBlack sm:text-sm sm:leading-6"
          onChange={(e) => setInputMessage(e.target.value)}
          value={inputMessage}
        />
        <CommonButton
          className="w-10 h-10 bg-chatBg rounded-full flex justify-center items-center"
          onClick={handleSend}
        >
          <PaperAirplaneIcon className="w-7 h-7 cursor-pointer" />
        </CommonButton>
      </div>
    </div>
  );
};

export default ChatInput;
