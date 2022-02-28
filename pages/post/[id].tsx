import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import ReactMarkdown from "react-markdown";
import Footer from "../../components/Footer";

const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());

import Navbar from "../../components/Navbar";

const Post: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: post } = useSWR(`/api/post/${id}`, fetcher);

  return (
    <div>
      <Head>
        <title>{post?.title ? post.title : "Loading..."} | Crystal</title>
      </Head>
      <Navbar />
      <main className="flex flex-col items-center border-t-2 border-gray-300">
        <div className="image h-96 p-0 mt-2 md:mt-8 bg-black">
          {post && (
            <img
              src={post ? post.src : "https://source.unsplash.com/random"}
              className="h-full w-full object-cover opacity-100"
              alt=""
            />
          )}
        </div>
        <section
          id="post-container"
          className="px-2 md:p-0 md:px-16 w-full flex justify-center items-center"
        >
          <div className="max-w-6xl pb-16 pt-8">
            {post ? (
              <div className="prose">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Post;
