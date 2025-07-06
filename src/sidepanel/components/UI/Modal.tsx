import classNames from "classnames";
import { PropsWithChildren } from "react";

interface IProps {
  onClose: () => void;
  title: string;
}

const Modal = ({ onClose, title, children }: PropsWithChildren<IProps>) => (
  <>
    <div
      className={classNames("top-0 left-0 h-screen w-screen bg-zinc-800 opacity-60", "fixed")}
      onClick={onClose}
    ></div>
    <div
      className={classNames(
        "top-1/2 left-1/2 flex w-full max-w-[300px] -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-xl bg-zinc-200 p-4 shadow-2xl",
        "fixed"
      )}
    >
      <div className="flex items-center justify-between">
        {title}
        <button className="icon-[mdi--close]" onClick={onClose}></button>
      </div>
      {children}
    </div>
  </>
);

export default Modal;
