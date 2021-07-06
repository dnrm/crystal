import React from "react";
import Link from "next/link";

interface Props {
    href: string;
    src: string;
    children: string;
}

const Post = ({ href, src, children }: Props) => {
    const slug = href + children.toLowerCase().replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '').split(" ").join("-");

    return (
        <Link href={slug}>
            <a>
                <div className="post bg-gray-100 rounded-lg p-4 shadow-lg">
                    <div className="image">
                        <img
                            src={src}
                            alt=""
                            className="h-full w-full object-cover rounded-md shadow-lg"
                        />
                    </div>
                    <h1 className="text-lg font-semibold pt-2 font-dm leading-5">
                        {children}
                    </h1>
                </div>
            </a>
        </Link>
    );
};

export default Post;
