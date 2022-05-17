import React from "react";

const Modal = ({ title, hide, confirmDelete }: any) => {

  return (
    <div className="mt-40 flex justify-between items-center flex-col shadow-xl bg-white overflow-y-auto overflow-x-hidden fixed z-50 max-w-4xl border-gray-200 border-2 rounded-xl mx-auto h-1/3 md:inset-0">
      <div className="relative p-4 w-full h-full md:h-auto">
        <h1 className="text-4xl w-full font-bold tracking-tighter">
          Are you sure you want to delete this post?
        </h1>
      </div>
      <div className="title text-xl">{title}</div>
      <div className="buttons grid grid-cols-2 gap-4 p-4 w-full">
        <button className="p-2 bg-red-500 text-white px-8 rounded-md w-full col-span-1" onClick={confirmDelete}>
          Confirm
        </button>
        <button
          className="p-2 bg-gray-400 text-white px-8 rounded-md w-full col-span-1"
          onClick={hide}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
