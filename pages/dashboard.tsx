import React, { useState, useEffect } from "react";
import Head from "next/head";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import Post from "../components/Post";
import Footer from "../components/Footer";
import { useOwnPostsContext } from "../context/ownPosts";

export default function Login(props: any) {
  const { data: session } = useSession();
  const [layout, setLayout] = useState<string>("column");
  const posts: any = useOwnPostsContext();
  console.log(posts);

  const toggleLayout = (e: any) => {
    layout === "column" ? setLayout("row") : setLayout("column");
  };

  return (
    <>
      <Head>
        <title>Dashboard | Crystal</title>
        <meta name="description" content="View your dashboard" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={`true`}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <main className="flex flex-col p-8 bg-beige">
        <header className="flex items-center justify-between">
          <h1 className="text-4xl md:text-8xl lg:text-9xl tracking-tighter font-bold text-dark py-5">
            Dashboard
          </h1>
          <div className="logout flex items-center">
            {session && (
              <button onClick={() => signOut()}>
                <div className="flex items-center cursor-pointer">
                  <p className="font-semibold tracking-tighter text-xl md:text-2xl">
                    Logout
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
              </button>
            )}
          </div>
        </header>
        <hr className="border-1 border-gray-300" />
        <section>
          {session ? (
            <div className="dashboard-content">
              <div className="create-post py-8 flex justify-between items-center">
                <h1 className="text-2xl md:text-4xl font-semibold">Posts</h1>
                <div className="buttons flex justify-center items-center">
                  <button
                    className="outline-none mr-2 py-2 px-4 bg-gray-300 text-black inline-block shadow-sm hover:shadow-xl rounded-xl transition-all duration-200"
                    onClick={toggleLayout}
                  >
                    {layout == "row" ? (
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
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    ) : (
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
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                    )}
                  </button>
                  <Link href={`/create-post`}>
                    <a className="py-2 px-4 bg-blue-500 text-white inline-block shadow-sm hover:shadow-xl rounded-xl transition-all duration-200">
                      Create Post
                    </a>
                  </Link>
                </div>
              </div>
              {posts && posts.length > 0 ? (
                <div
                  className={`posts mx-auto ${
                    layout === "row" ? "grid grid-cols-1 gap-4" : null
                  } ${
                    layout === "column"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                      : null
                  }`}
                >
                  {posts
                    ? posts.map((i: any) => {
                        return (
                          <Post
                            layout={layout}
                            id={i._id}
                            title={i.title}
                            content={i.content}
                            src={i.src}
                            mode="dashboard"
                          ></Post>
                        );
                      })
                    : null}
                </div>
              ) : (
                <div className="flex flex-col gap-4 justify-center items-center h-96">
                  <h1 className="text-4xl font-bold w-full text-center">
                    Create your first post!
                  </h1>
                  <Link href={`/create-post`}>
                    <a className="py-6 px-20 bg-blue-500 text-white text-xl inline-block shadow-xl hover:shadow-xl rounded-xl transition-all duration-200">
                      Create Post
                    </a>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="login-form w-auto h-80 flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl">Log in to create your own profile!</h3>
              <button
                className="bg-blue-500 p-4 rounded-lg shadow-xl text-white my-4"
                onClick={() => signIn()}
              >
                Log in
              </button>
            </div>
          )}
        </section>
      </main>
      <br />
      <Footer />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
