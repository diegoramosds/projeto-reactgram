interface MessageProps {
  msg: string | null | boolean;
  type: string;
}

const Message = ({ msg, type }: MessageProps) => {
  const messageClass =
    type === "success"
      ? "text-green-700 bg-zinc-800 border-green-400 rounded text-center"
      : type === "error"
        ? "text-red-700 bg-zinc-800 rounded text-center"
        : "text-gray-700 bg-gray-100 border-gray-400 text-center";

  return (
    <div className={`${messageClass} w-1/2 mx-auto`}>
      <p>{msg}</p>
    </div>
  );
};

export default Message;
