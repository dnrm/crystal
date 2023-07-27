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
      <header className="border-t-2 border-gray-300 bg-black">
        <div className="image relative h-[50vh] w-screen opacity-50">
          {post && (
            <Image
              src={post ? post.src : "https://source.unsplash.com/random"}
              fill
              className="bg-cover object-cover"
              alt=""
            />
          )}
        </div>
      </header>
      <main className="flex flex-col items-center">
        <section
          id="post-container"
          className="px-2 md:p-0 w-full flex justify-center items-center max-w-4xl mx-auto"
        >
          <div className="pb-16 pt-8">
            {post ? (
              <div className="prose leading-[2.4em] max-w-none text-justify font-sauce prose-h1:tracking-tight prose-h1:font-black prose-h1:text-left prose-h1:text-6xl prose-h1:m-0 prose-hr:my-4 prose-h2:text-4xl">
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
