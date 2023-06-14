/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import Footer from "../../components/Footer";
import { toast } from "react-hot-toast";
import { getSession } from "next-auth/react";

import Modal from "../../components/Modal";

type viewMode = "feed" | "dashboard";

interface Post {
  title: string;
  content: string;
  user: string;
  src?: string;
  mode: viewMode;
}

const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());

import Navbar from "../../components/Navbar";

const Post: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const textArea = useRef(null);

  const [modal, setModal] = useState(false);

  const { data: post } = useSWR(`/api/post/${id}`, fetcher);

  const createPost = async ({ title, user, src }: any) => {
    let api = "/api/update-post";

    const response = await fetch(api, {
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

    const res = response.json();

    if (response.ok) {
      toast.success("Updated post successfully!");
      router.push("/dashboard");
    }
    console.log(res);
    return res;
  };

  const deletePost = async () => {
    setModal(false)
    console.log("deleting post: " + id);

    let api = `/api/delete/${id}`;

    const response = await fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log('yay')
      toast.success("Deleted post successfully!");
      router.push("/dashboard");
    } else {
      console.log('oh')
    }
  };

  const hideModal = () => {
    setModal(false);
  };

  const showModal = () => {
    setModal(true);
  };

  return (
    <div>
      {modal ? (
        <>
          <div className="dim bg-black opacity-50 fixed w-screen h-screen" />
          <Modal
            title={post.title}
            hide={hideModal}
            confirmDelete={deletePost}
          />
        </>
      ) : null}
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
            <div className="submitButton grid place-items-center grid-cols-7 gap-4">
              <button
                type="submit"
                className="flex justify-center items-center gap-2 px-12 py-3 mt-4 mb-8 col-span-5 w-full bg-blue-500 hover:bg-blue-600 text-white shadow-2xl rounded-md outline-none cursor-pointer"
              >
                Save Post
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </svg>
              </button>
              <button
                onClick={showModal}
                type="button"
                className="flex justify-center items-center gap-2 px-12 py-3 mt-4 mb-8 col-span-2 w-full bg-red-400 hover:bg-red-600 text-white shadow-2xl rounded-md outline-none cursor-pointer"
              >
                Delete
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
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

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  console.log("Session: " + JSON.stringify(session));
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session: session },
  };
}
