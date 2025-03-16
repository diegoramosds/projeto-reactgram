import { FormEvent, ReactNode } from "react";
import { Link } from "react-router-dom";

// Tipagem das props, incluindo o children
interface FormStyleProps {
    title: string;
    subtitle: string;
    children: ReactNode;
    linkTo: string;
    linkText: string;
    btnText: string;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    loading: boolean;
    errorMessage?: ReactNode;
    successMessage?: ReactNode;
  }
  

const FormStyle = ({ children, title, subtitle, handleSubmit, loading, linkTo, linkText, btnText, errorMessage, successMessage  }: FormStyleProps) => {
  return (
    <div className="bg-black/20 w-11/12 mx-auto p-4 my-4 rounded-xl md:w-2/5">
      <div className="text-center w-11/12 mx-auto my-0">
      <h1 className="text-2xl font-bold pb-3">{title}</h1>
      <p className="text-zinc-400 pb-6">{subtitle}</p>
      
      <form onSubmit={handleSubmit} className="border-b border-zinc-900/30 pb-6">
      {children}
      {!loading && <input type="submit" value={btnText} />}
      {loading && <input type="submit" value="Aguarde" disabled/>}

      {errorMessage ? (
            <div className="mt-4">
              {errorMessage}
            </div>
          ) : 
          <div className="mt-4">
          {successMessage}
        </div>}
      </form>
        <p className="pt-12 pb-4">{linkText} <Link to={linkTo} className="bg-clip-text text-transparent 
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-br 
          transition-colors duration-200">Clique aqui</Link></p>
      </div>
    </div>
  );
};

export default FormStyle;
