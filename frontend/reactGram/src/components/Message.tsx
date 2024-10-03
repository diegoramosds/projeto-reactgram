interface MessageProps  {
 msg: string | null,
 type: string
}

const Message = ({msg, type}: MessageProps) => {
    
    const messageClass =
    type === "success"
        ? "text-green-700 bg-zinc-800 border-green-400 rounded"
        : type === "error"
        ? "text-red-700 bg-zinc-800 rounded"
        : "text-gray-700 bg-gray-100 border-gray-400";

  return (
    <div className={`${messageClass}`}>
        <p>{msg}</p>
    </div>
  )
}

export default Message