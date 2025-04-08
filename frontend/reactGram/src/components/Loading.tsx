import { CgSpinner } from "react-icons/cg";

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <CgSpinner size={30} className="animate-spin text-sky-600" />
    </div>
  );
};

export default Loading;
