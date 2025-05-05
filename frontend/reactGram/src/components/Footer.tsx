import { BiCamera } from "react-icons/bi";

const Footer = () => {
  return (
    <div className="bg-black border-t border-zinc-900/30 shadow-sm flex flex-col">
      <footer className="flex flex-col justify-center items-center gap-6 py-10">
        <p className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center gap-1">
          <span>
            <BiCamera className="text-zinc-100" size={24} />{" "}
          </span>
          ReactGram
        </p>
        <div className="flex flex-col text-center text-zinc-400 gap-2 text-xs">
          <p>Este é um projeto simples para estudos de React e Tailwind CSS</p>
          <p>© 2025 ReactGram • Projeto educacional</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
