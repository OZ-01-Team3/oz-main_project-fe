import { ReactNode } from 'react';

type ButtonProps = {
  className: string;
  onClick?: () => void;
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

const CommonButton = ({ className, onClick, children, type }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default CommonButton;
