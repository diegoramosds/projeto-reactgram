import { uploads } from "../utils/config";
import { BiUserCircle } from "react-icons/bi";

interface UserProps {
  profileImage: string;
  name: string;
}

interface PhotoUserProps {
  user: UserProps | null;
  sizeImage: string;
  sizeIcon: string;
}

// 👇 Função auxiliar para decidir se é local ou URL
const getProfileImageSrc = (image: string) => {
  if (!image) return "";
  if (image.startsWith("http")) return image;

  // Fallback caso use imagens locais ainda
  return `${uploads}/${image}`;
};


const PhotoUser = ({ user, sizeImage, sizeIcon }: PhotoUserProps) => {
  return (
    <div className="flex items-center">
      {user?.profileImage ? (
        <img
          src={getProfileImageSrc(user.profileImage)}
          alt={user.name}
          style={{ width: sizeImage, height: sizeImage }}
          className="mx-auto rounded-full object-cover"
        />
      ) : (
        <BiUserCircle size={parseInt(sizeIcon)} />
      )}
    </div>
  );
};

export default PhotoUser;
