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
    <div className="bg-zinc-950 w-2/5 mx-auto p-4 my-10 rounded-xl">
      <div className="text-center w-11/12 mx-auto my-0">
      <h1 className="text-2xl font-bold pb-10 pt-8">{title}</h1>
      <p className="text-zinc-400 pb-6">{subtitle}</p>
      
      <form onSubmit={handleSubmit} className="border-b border-zinc-700 pb-6">
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
        <p className="pt-12 pb-4">{linkText} <Link to={linkTo} className="text-sky-700 border-b border-sky-700 hover:text-sky-700/80">Clique aqui</Link></p>
      </div>
    </div>
  );
};

export default FormStyle;
