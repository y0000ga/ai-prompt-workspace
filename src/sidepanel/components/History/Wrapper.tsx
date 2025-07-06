import classNames from "classnames";
import { PropsWithChildren } from "react";

interface IProps {
  actions: {
    icon: string;
    onClick: () => void;
    disabled?: boolean;
  }[];
  hasSeparator?: boolean;
}

const Wrapper = ({ children, actions, hasSeparator }: PropsWithChildren<IProps>) => (
  <li className={classNames("flex flex-col gap-1", hasSeparator && "border-b border-zinc-200")}>
    {children}
    <div className="mb-2 flex items-center justify-end">
      {actions.map(({ icon, onClick, disabled }) => (
        <button
          key={icon}
          onClick={onClick}
          className={classNames("text-xl text-gray-600", icon)}
          disabled={disabled}
        />
      ))}
    </div>
  </li>
);

export default Wrapper;
