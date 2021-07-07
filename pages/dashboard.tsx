import React from "react";
import Head from "next/head";
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import Post from "../components/Post";

export default function Login(props: any) {
    const [session] = useSession();

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
                                <Link href={`/create-post`}>
                                    <a className="py-2 px-4 bg-blue-500 text-white inline-block shadow-sm hover:shadow-xl rounded-xl transition-all duration-200">
                                        Create Post
                                    </a>
                                </Link>
                            </div>
                            <div className="posts grid grid-cols-1 gap-4">
                                <Post
                                    src="https://i.scdn.co/image/ab67616d0000b2737a4c8c59851c88f6794c3cbf"
                                    href="/posts/"
                                >
                                    Remembering the glory days of Oasis.
                                </Post>
                                <Post
                                    src="https://i.scdn.co/image/ab67616d0000b2737c8f18614002cc5542f6c7aa"
                                    href="/posts/"
                                >
                                    My opinion on Oasis' debut album Definitely
                                    Maybe.
                                </Post>
                                <Post
                                    src="https://i.scdn.co/image/ab67616d0000b273707d13d3f87652e737e94d45"
                                    href="/posts/"
                                >
                                    Urban Hymns, the album that propelled The
                                    Verve into fame
                                </Post>
                                <Post
                                    src="https://i.scdn.co/image/ab67616d0000b273fd952bece8f049dbcd7df93f"
                                    href="/posts/"
                                >
                                    The giant four of the 90s: Oasis, Blur, Pulp, and Suede.
                                </Post>
                                <Post
                                    src="https://i.scdn.co/image/ab67616d0000b273aeda362a434f01d0eff70b4e"
                                    href="/posts/"
                                >
                                    Was Be Here Now really the end of Britpop?
                                </Post>
                                <Post
                                    src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/10/02/12/rexfeatures_1588551a_0.jpg"
                                    href="/posts/"
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
