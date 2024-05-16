import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

export const ModalPortal = ({ children }: PropsWithChildren) => {
  const modal = document.getElementById('modal');

  // modal이 null이 아닐 때만 포털 생성
  if (modal !== null) {
    return ReactDOM.createPortal(children, modal);
  } else {
    return null;
  }
};
