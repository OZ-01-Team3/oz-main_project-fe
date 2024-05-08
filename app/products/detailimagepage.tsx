// DetailPage.tsx

import { useState } from 'react';

// 이벤트 핸들러 타입 정의
type EventHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.ChangeEvent<HTMLInputElement> | DragEvent) => void;

export default function DetailPage() {
  // 파일 목록을 상태로 관리
  const [fileList, setFileList] = useState<File[]>([]);

  // 파일 변경 이벤트 핸들러
  const handleChange: EventHandler = (event) => {
    const files = Array.from(event.target.files || []);
    handleUpdate(files);
  };

  // 드래그 앤 드롭 이벤트 핸들러
  const handleDragEnter: EventHandler = (event) => {
    event.preventDefault();
    console.log("dragenter");
    if (event.target instanceof HTMLElement && event.target.classList.contains("inner")) {
      event.target.style.background = "#616161";
    }
  };

  const handleDragOver: EventHandler = (event) => {
    console.log("dragover");
    event.preventDefault();
  };

  const handleDragLeave: EventHandler = (event) => {
    event.preventDefault();
    console.log("dragleave");
    if (event.target instanceof HTMLElement && event.target.classList.contains("inner")) {
      event.target.style.background = "#3a3a3a";
    }
  };

  const handleDrop: EventHandler = (event) => {
    event.preventDefault();
    console.log("drop");
    if (event.target instanceof HTMLElement && event.target.classList.contains("inner")) {
      const files = Array.from(event.dataTransfer?.files || []);
      event.target.style.background = "#3a3a3a";
      handleUpdate(files);
    }
  };

  // 파일 업데이트 함수
  const handleUpdate = (files: File[]) => {
    setFileList([...fileList, ...files]);
  };

  // JSX 반환
  return (
    <div>
      <input id="input" type="file" onChange={handleChange} />
      <div
        id="label"
        onMouseOver={(event) => {
          event.preventDefault();
          const label = document.getElementById("label");
          label?.classList.add("label--hover");
        }}
        onMouseOut={(event) => {
          event.preventDefault();
          const label = document.getElementById("label");
          label?.classList.remove("label--hover");
        }}
      >
        {/* inner 클래스를 가진 요소에 대한 드래그 앤 드롭 이벤트 */}
        <div
          className="inner"
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          Drag and Drop files here
        </div>
      </div>
      <div id="preview">
        {/* 파일 미리보기 */}
        {fileList.map((file, index) => (
          <div key={index} className="container-img">
            <img className="embed-img" src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
