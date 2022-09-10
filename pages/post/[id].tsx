import useSWR from "swr";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());


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
        <div className="image relative w-full h-[50vh] max-w-3xl mt-2 md:mt-8">
          {post && (
            <Image
              src={post ? post.src : "https://source.unsplash.com/random"}
              layout="fill"
              objectFit="contain"
              alt=""
            />
          )}
        </div>
        <section
          id="post-container"
          className="px-2 md:p-0 w-full flex justify-center items-center max-w-3xl mx-auto"
        >
          <div className="pb-16 pt-8">
            {post ? (
              <div className="prose max-w-none text-justify">
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
