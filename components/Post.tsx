import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  src?: string;
  title: string;
  layout: string;
  content: string;
  id: string;
}

const Post = ({ src, title, layout, content, id }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const showOptions = () => {
    setIsHovered(true);
  };

  const hideOptions = () => {
    setIsHovered(false);
  };

  return (
    <div onMouseEnter={showOptions} onMouseLeave={hideOptions}>
      {isHovered && (
        <div onClick={() => {alert('u')}} className="cursor-pointer options bg-gray-100 absolute pt-6 pl-6 pr-4 pb-4 rounded-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </div>
      )}
      <Link href={`/post/${id}`}>
        <a>
          <motion.div
            layout="position"
            transition={{
              duration: 0.3,
            }}
            className={`bg-gray-100 rounded-lg p-4 ${
              layout === "row" ? "flex justify-start items-center" : null
            } ${
              layout === "column"
                ? "h-full flex flex-col items-start justify-start"
                : null
            }`}
          >
            {src ? (
              <img
                src={src}
                alt=""
                className={`object-center rounded-md object-cover ${
                  layout === "row" ? "mr-2 w-16 h-16 mb-0" : "mb-4 h-48 w-full"
                }`}
              />
            ) : null}
            <div className="flex flex-col w-full break-all overflow-hidden">
              <h1
                className={`font-semibold text-lg leading-5 ${
                  layout === "row" ? "mr-2 min-w-max" : "mr-0"
                }`}
              >
                {title}
              </h1>
              <p className="text-sm truncate max-w-full">{content}</p>
            </div>
          </motion.div>
        </a>
      </Link>
    </div>
  );
};

export default Post;
