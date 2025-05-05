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

const getProfileImageSrc = (image: string | undefined) => {
  if (!image) return "";
  const baseUrl = image.startsWith("http")
    ? image
    : `${uploads}/users/${image}`;
  return baseUrl.replace("/upload/", "/upload/w_100,f_auto/");
};


const PhotoUser = ({ user, sizeImage, sizeIcon }: PhotoUserProps) => {
  return (
    <div className="flex items-center">
      {user?.profileImage ? (
        <img
          src={getProfileImageSrc(user.profileImage)}
          alt={user.name || "Imagem de perfil do usuário"}
          style={{ width: sizeImage, height: sizeImage }}
          className="mx-auto rounded-full"
        />
      ) : (
        <BiUserCircle size={parseInt(sizeIcon)} />
      )}
    </div>
  );
};

export default PhotoUser;
