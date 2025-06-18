import { useState } from "react";

const AddStatus = ({ onAdd, onClose }: { onAdd: (title: string) => void; onClose: () => void }) => {
  const [title, setTitle] = useState("");
  return (
    <div className="flex flex-col gap-4 border p-4">
      <div className="icon-[mdi--delete] text-xl text-white" onClick={onClose}></div>
      <div className="flex gap-4">
        <label>Title</label>
        <input
          className="border"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div
        className="icon-[mdi--add-box] text-xl text-white"
        onClick={() => {
          onAdd(title);
        }}
      ></div>
    </div>
  );
};

export default AddStatus;
