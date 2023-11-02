import { ReactNode } from "react";

interface props {
  children: ReactNode;
}

const Center = ({ children }: props) => {
  return (
    <div className=" flex items-center justify-center  min-h-screen bg-white-600">
      <div className=" flex flex-col border rounded bg-slate-200">
        {children}
      </div>
    </div>
  );
};
export default Center;
