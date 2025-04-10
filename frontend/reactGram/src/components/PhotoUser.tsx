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

const getProfileImageSrc = (image: string) => {
  if (!image) return "";
  if (image.startsWith("http")) return image;

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
          className="mx-auto rounded-full"
        />
      ) : (
        <BiUserCircle size={parseInt(sizeIcon)} />
      )}
    </div>
  );
};

export default PhotoUser;
