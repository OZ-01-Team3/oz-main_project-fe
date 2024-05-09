interface ChatInputProps {
  content: string | any;
  time: string;
  subject: string;
}

const ChatBubble = ({ content, time, subject }: ChatInputProps) => {
  const flexStyle =
    subject === "me"
      ? "flex flex-row items-center px-2 rounded-3xl  "
      : "flex flex-row-reverse items-center rounded-3xl pl-2";
  const justifyStyle =
    subject === "me"
      ? "flex justify-end items-center mt-3"
      : "flex justify-start items-center mt-3";
  const inputColor =
    subject === "me"
      ? "bg-mainBlack text-mainWhite text-sm rounded-lg px-4 py-2 max-w-md"
      : "bg-mainWhite border-mainBlack border text-mainBlack text-sm rounded-lg px-4 py-2 max-w-md";
  return (
    <div className={justifyStyle}>
      <div className={flexStyle}>
        <p className="text-footerText mb-1 mx-2">{time}</p>
        <div className={inputColor}>{content}</div>
      </div>
    </div>
  );
};

export default ChatBubble;
