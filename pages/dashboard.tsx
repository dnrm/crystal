import React, { useState, useEffect } from "react";
import Head from "next/head";
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import Post from "../components/Post";
import Footer from "../components/Footer";

export default function Login(props: any) {
    const [session] = useSession();
    const [layout, setLayout] = useState<string>('column');
    
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
            <main className="flex flex-col p-8">
                <header className="flex items-center justify-between">
                    <h1 className="text-4xl md:text-8xl lg:text-9xl tracking-tighter font-bold text-black py-5">
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
                                <h1 className="text-2xl md:text-4xl font-semibold">
                                    Posts
                                </h1>
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
                            <div
                                className={`posts ${
                                    layout === "row"
                                        ? "grid grid-cols-1 gap-4"
                                        : null
                                } ${
                                    layout === "column"
                                        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
                                        : null
                                }`}
                            >
                                <Post
                                    layout={layout}
                                    src="https://i.scdn.co/image/ab67616d0000b2737a4c8c59851c88f6794c3cbf"
                                >
                                    Remembering the glory days of Oasis.
                                </Post>
                                <Post
                                    layout={layout}
                                    src="https://i.scdn.co/image/ab67616d0000b2737c8f18614002cc5542f6c7aa"
                                >
                                    My opinion on Oasis' debut album Definitely
                                    Maybe.
                                </Post>
                                <Post
                                    layout={layout}
                                    src="https://i.scdn.co/image/ab67616d0000b273707d13d3f87652e737e94d45"
                                >
                                    Urban Hymns, the album that propelled The
                                    Verve into fame
                                </Post>
                                <Post
                                    layout={layout}
                                    src="https://i.scdn.co/image/ab67616d0000b273fd952bece8f049dbcd7df93f"
                                >
                                    The giant four of the 90s: Oasis, Blur,
                                    Pulp, and Suede.
                                </Post>
                                <Post
                                    layout={layout}
                                    src="https://i.scdn.co/image/ab67616d0000b273aeda362a434f01d0eff70b4e"
                                >
                                    Was Be Here Now really the end of Britpop?
                                </Post>
                                <Post
                                    layout={layout}
                                    src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/10/02/12/rexfeatures_1588551a_0.jpg"
                                >
                                    August 14th 1995, 2 Giants, 1 number one.
                                </Post>
                            </div>
                        </div>
                    ) : (
                        <div className="login-form w-auto h-80 flex flex-col justify-center items-center text-center">
                            <h3 className="text-2xl">
                                Log in to create your own profile!
                            </h3>
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
