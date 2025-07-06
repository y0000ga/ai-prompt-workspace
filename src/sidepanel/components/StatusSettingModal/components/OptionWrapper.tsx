import EmojiPicker from "emoji-picker-react";
import { PropsWithChildren, useRef, useState } from "react";

import useClickOutside from "@/sidepanel/hooks/useClickOutside";

type TProps = PropsWithChildren<{
  onLabelEdit: (emoji: string) => void;
  label: string;
}>;

const OptionWrapper = ({ children, onLabelEdit, label }: TProps) => {
  const [isEditLabel, setIsEditLabel] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useClickOutside(pickerRef, () => setIsEditLabel(false));

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full items-center justify-center gap-1">
        <div
          onClick={() => {
            setIsEditLabel((prev) => !prev);
          }}
          className="cursor-pointer"
        >
          {label}
        </div>
        {children}
      </div>
      {isEditLabel && (
        <div ref={pickerRef}>
          <EmojiPicker
            className="h-1/2 max-h-[270px] w-full max-w-[270px]"
            searchDisabled
            skinTonesDisabled
            previewConfig={{ showPreview: false }}
            onEmojiClick={(emojiData) => {
              onLabelEdit(emojiData.emoji);
              setIsEditLabel(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default OptionWrapper;
