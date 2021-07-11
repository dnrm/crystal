import React from "react";
import Link from "next/link";

interface Props {
    src: string;
    children: string;
}

const Post = ({ src, children }: Props) => {
    let href = '/post/'
    const slug = href + children.toLowerCase().replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '').split(" ").join("-");

    return (
        <Link href={slug}>
            <a>
                <div className="post bg-gray-100 rounded-lg shadow-lg flex flex-row justify-start items-center h-16">
                    <div className="image h-full">
                        <img
                            src={src}
                            alt=""
                            className="h-full object-cover rounded-md mr-2 p-2"
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
