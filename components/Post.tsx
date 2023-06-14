import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

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
    <div
      onMouseEnter={showOptions}
      onMouseLeave={hideOptions}
      className="bg-neutral-100 rounded-xl"
    >
      {isHovered && dashboard == "dashboard" ? (
        // LEGACY EDIT BUTTON
        <Link legacyBehavior href={`/edit/${id}`}>
          <a className="cursor-pointer options z-30 bg-neutral-100 border-2 border-l-2 absolute p-4 rounded-br-md rounded-tl-md">
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
      <Link legacyBehavior href={`/post/${id}`}>
        <a className="rounded-md">
          <motion.div
            layout="position"
            transition={{
              duration: 0.3,
            }}
            className={`text-black box-border rounded-md ${
              layout === "row" ? "flex justify-start items-center" : null
            } ${
              layout === "column"
                ? "h-full flex flex-col items-start justify-start"
                : null
            }`}
          >
            <div
              className={`${layout === "column" ? "w-full px-5 pt-5" : "p-3"}`}
            >
              {src ? (
                <div
                  className={`relative ${
                    layout === "row"
                      ? "w-16 h-16"
                      : "h-56 w-full"
                  } `}
                >
                  <Image
                    src={src}
                    blurDataURL="https://via.placeholder.com/100x100?text=+"
                    placeholder="blur"
                    alt=""
                    fill
                    className={`object-center rounded-lg object-cover`}
                  />
                </div>
              ) : null}
            </div>
            <div className={`flex flex-col w-full overflow-hidden ${layout === "column" ? "p-5" : "py-3 pl-1"}`}>
              <h1
                className={`font-bold font-sauce text-xl leading-8 hover:underline ${
                  layout === "row" ? "mr-2 truncate" : "mr-0 truncate "
                }`}
              >
                {title}
              </h1>
              <p className="text-sm max-w-full">{content.substring(0, 100)}...</p>
            </div>
          </motion.div>
        </a>
      </Link>
    </div>
  );
};

export default Post;
