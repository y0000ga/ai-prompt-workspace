import classNames from "classnames";
import { useCallback, useEffect, useRef } from "react";

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const AutoResizeTextarea = ({ value, onChange, className, ...props }: IProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeHeight = useCallback(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
      handleChangeHeight();
    }
  };

  useEffect(() => {
    handleChangeHeight();
  }, [handleChangeHeight]);

  return (
    <textarea
      ref={textareaRef}
      rows={1}
      value={value}
      onChange={handleInput}
      className={classNames("w-full resize-none overflow-hidden", className)}
      {...props}
    />
  );
};

export default AutoResizeTextarea;
