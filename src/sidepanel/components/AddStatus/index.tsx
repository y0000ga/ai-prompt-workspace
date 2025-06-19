import { useState } from "react";

const AddStatus = ({ onAdd }: { onAdd: (title: string) => void }) => {
  const [title, setTitle] = useState("");
  return (
    <div className="mx-4 flex items-center justify-between gap-4 rounded-md border-[0.5px] border-zinc-200 p-4 shadow-xl">
      <div className="flex flex-grow items-center gap-4">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          className="flex-grow p-1"
          placeholder="Fill in title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div
        className="icon-[mdi--add-box] text-xl text-gray-600"
        onClick={() => {
          onAdd(title);
          setTitle("");
        }}
      ></div>
    </div>
  );
};

export default AddStatus;
