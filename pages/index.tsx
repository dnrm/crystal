import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import src from "../images/germany.jpg";
import { usePostsContext } from "../context/posts";
import Post from "../components/Post";
import { PostType } from "../types/Post";

export default function Home() {
  const { data: session } = useSession();
  const posts: PostType[] | null = usePostsContext();
  const [layout, setLayout] = useState<string>("column");

  return (
    <>
      <Navbar />
      <main className="flex flex-col p-4 md:p-8">
        <Head>
          <title>Home | Crystal</title>
          <meta property="og:title" content="Crystal | dnrm" />
          <meta
            property="og:description"
            content="Crystal is a social media site by Daniel Medina"
          />
          <meta
            property="og:image"
            content="https://source.unsplash.com/random"
          />
          <script
            src="https://kit.fontawesome.com/d465d5991c.js"
            crossOrigin="anonymous"
            defer={true}
          ></script>
        </Head>
        <header className={`flex items-center justify-between`}>
          <h1 className="text-4xl md:text-8xl lg:text-9xl tracking-tighter font-bold text-black py-5">
            Welcome
          </h1>
          <div className="login flex items-center">
            {!session && (
              <Link legacyBehavior href={`/dashboard`}>
                <div className="flex items-center cursor-pointer">
                  <p className="font-semibold tracking-tighter text-xl md:text-2xl">
                    Login
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 md:h-12 w-8 md:w-12 mx-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
              </Link>
            )}
          </div>
        </header>
        <section className="max-h-screen h-[75vh] w-full">
          <div className="relative h-full w-full">
            <Image
              src={src}
              alt="Cover image"
              className="object-cover"
              fill
              priority={true}
              placeholder="blur"
              blurDataURL={"/germany.jpeg"}
            />
          </div>
        </section>
        <section id="posts" className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-8xl tracking-tighter font-bold text-black pt-8 pb-2">
            Posts
          </h1>
          <hr />
          <div className="mt-5">
            {posts && posts.length > 0 ? (
              <div
                className={`posts ${
                  layout === "row" ? "grid grid-cols-1 gap-4" : null
                } ${
                  layout === "column"
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5"
                    : null
                }`}
              >
                {posts
                  ? posts.map((i: any) => {
                      return (
                        <Post
                          key={i._id}
                          layout={layout}
                          id={i._id}
                          title={i.title}
                          content={i.content}
                          src={i.src}
                        ></Post>
                      );
                    })
                  : null}
              </div>
            ) : (
              <div className="h-96 w-full grid place-items-center">
                <h1 className="text-5xl font-bold tracking-tighter">
                  No posts yet!
                </h1>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
