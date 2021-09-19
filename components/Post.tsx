import React from "react";
import Link from "next/link";

interface Props {
  src?: string;
  title: string;
  layout: string;
  content: string;
  id: string;
}

const Post = ({ src, title, layout, content, id }: Props) => {

  return (
    <Link href={`/post/${id}`}>
      <a>
        <div
          className={`post bg-gray-100 rounded-lg p-4 ${
            layout === "row"
              ? "flex flex-col justify-start items-start"
              : null
          } ${
            layout === "column" ? "h-full flex flex-col justify-start" : null
          }`}
        >
          {src ? (
            <div className="image h-full">
              <img
                src={src}
                alt=""
                className="h-full object-cover rounded-md mr-2 p-2"
              />
            </div>
          ) : null}
          <h1
            className={`font-semibold text-lg leading-5 ${layout === "row" ? 'mr-2' : 'mr-0'}`}
          >
            {title}
          </h1>
          <p className="text-sm truncate max-w-full">{content}</p>
        </div>
      </a>
    </Link>
  );
};

export default Post;
