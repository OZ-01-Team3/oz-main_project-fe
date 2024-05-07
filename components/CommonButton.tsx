import { ReactNode } from 'react';

type ButtonProps = {
  className: string;
  onClick?: () => void;
  children?: ReactNode;
}

const CommonButton = ({ className, onClick, children }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default CommonButton