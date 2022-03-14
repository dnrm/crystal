import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type viewMode = "feed" | "dashboard";

interface Props {
  src?: string;
  title: string;
  layout: string;
  content: string;
  id: string;
  mode?: viewMode;
}

const Post = ({ src, title, layout, content, id, mode }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [dashboard, setDashboard] = useState(mode || "feed");

  const showOptions = () => {
    setIsHovered(true);
  };

  const hideOptions = () => {
    setIsHovered(false);
  };

  return (
    <div onMouseEnter={showOptions} onMouseLeave={hideOptions}>
      {isHovered && dashboard == "dashboard" ? (
        <Link href={`/edit/${id}`}>
          <a className="cursor-pointer options bg-white border-2 border-l-2 absolute p-4 rounded-br-md">
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
          </a>
        </Link>
      ) : null}
      <Link href={`/post/${id}`}>
        <a>
          <motion.div
            layout="position"
            transition={{
              duration: 0.3,
            }}
            className={`border-2 text-black box-border ${
              layout === "row" ? "flex justify-start items-center" : null
            } ${
              layout === "column"
                ? "h-full flex flex-col items-start justify-start"
                : null
            }`}
          >
            <div className="bg-white  px-3 pt-3">
              {src ? (
                <img
                  src={src}
                  alt=""
                  className={`object-center rounded-sm object-cover ${
                    layout === "row" ? "mr-2 w-16 h-16 mb-0 pb-3" : "h-56"
                  }`}
                />
              ) : null}
            </div>
            <div className="flex flex-col w-full overflow-hidden p-4">
              <h1
                className={`font-semibold text-xl leading-8 ${
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
