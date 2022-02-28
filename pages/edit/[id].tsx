import React, { useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import ReactMarkdown from "react-markdown";
import Footer from "../../components/Footer";

interface Post {
  title: string;
  content: string;
  user: string;
  src?: string;
}

const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());

import Navbar from "../../components/Navbar";

const Post: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const textArea = useRef(null);

  const { data: post } = useSWR(`/api/post/${id}`, fetcher);

  const createPost = async ({ title, user, src }: any) => {
    let api = "/api/update-post";

    const response = fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title: title,
        // @ts-ignore
        content: textArea?.current?.value,
        user,
        src,
      }),
    });

    console.log(await response);
    return response;
  };

  return (
    <div>
      <Head>
        <title>{post?.title ? post.title : "Loading..."} | Crystal</title>
      </Head>
      <Navbar />
      <header className="flex items-center justify-between border-t-2 border-gray-300 p-4 md:p-8">
        <h1 className="text-4xl md:text-8xl lg:text-9xl tracking-tighter font-bold text-black py-5">
          Edit Post
        </h1>
      </header>
      <main className="flex flex-col items-center">
        <div className="mx-2 image max-w-4xl p-2 mt-2 md:mt-8 rounded-xl border-2 border-gray-200">
          {post && (
            <img
              src={post ? post.src : "https://source.unsplash.com/random"}
              className="h-full w-full object-cover opacity-100"
              alt=""
            />
          )}
        </div>
        <section id="post-container" className="px-2 md:p-0 w-full max-w-4xl">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              console.log(id);
              await createPost({
                title: post.title,
                user: post.user,
                src: post.src,
                id: post.id,
              });
            }}
          >
            <div className="pt-8">
              {post ? (
                <textarea
                  ref={textArea}
                  className="p-4 rounded-xl border-2 border-gray-200 outline-none resize-none w-full h-screen"
                  rows={900}
                >
                  {post.content}
                </textarea>
              ) : null}
            </div>
            <div className="submitButton">
              <button
                type="submit"
                className="px-12 py-3 mt-4 mb-8 w-full bg-blue-500 hover:bg-blue-600 text-white shadow-2xl rounded-md outline-none cursor-pointer"
              >
                Save Post
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Post;
