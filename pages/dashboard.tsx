import React from "react";
import Head from 'next/head';
import { signIn, signOut, useSession } from "next-auth/client";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Login() {
    const [session] = useSession();

    return (
        <>
            <Head>
                <title>Dashboard | Crystal</title>
                <meta name="description" content="View your dashboard" />
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
                            <div className="create-post py-4 flex justify-between items-center">
                                <h1 className="text-2xl md:text-4xl font-semibold">
                                    Posts
                                </h1>
                                <Link href={`/create-post`}>
                                    <a className="p-4 bg-blue-500 text-white inline-block shadow-sm hover:shadow-xl rounded-xl transition-all duration-200">
                                        Create Post
                                    </a>
                                </Link>
                            </div>
                            <div className="posts grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                <Link
                                    href={`/posts/${Math.floor(
                                        Math.random() * 100
                                    )}`}
                                >
                                    <a>
                                        <div className="post bg-gray-100 rounded-lg p-4 shadow-lg">
                                            <div className="image">
                                                <img
                                                    src="https://cdn.medina.dev/photo1.jpg"
                                                    alt=""
                                                    className="h-36 w-full object-cover rounded-md shadow-lg"
                                                />
                                            </div>
                                            <h1 className="text-xl font-semibold pt-2">
                                                How to write and record your
                                                first song using Garageband and
                                                a piano.
                                            </h1>
                                        </div>
                                    </a>
                                </Link>
                                <Link
                                    href={`/posts/${Math.floor(
                                        Math.random() * 100
                                    )}`}
                                >
                                    <a>
                                        <div className="post bg-gray-100 rounded-lg p-4 shadow-lg">
                                            <div className="image">
                                                <img
                                                    src="https://cdn.medina.dev/photo2.jpg"
                                                    alt=""
                                                    className="h-36 w-full object-cover rounded-md shadow-lg"
                                                />
                                            </div>
                                            <h1 className="text-xl font-semibold pt-2">
                                                My opinion on Oasis' debut album
                                                Definitely Maybe.
                                            </h1>
                                        </div>
                                    </a>
                                </Link>
                                <Link
                                    href={`/posts/${Math.floor(
                                        Math.random() * 100
                                    )}`}
                                >
                                    <a>
                                        <div className="post bg-gray-100 rounded-lg p-4 shadow-lg">
                                            <div className="image">
                                                <img
                                                    src="https://cdn.medina.dev/photo3.jpg"
                                                    alt=""
                                                    className="h-36 w-full object-cover rounded-md shadow-lg"
                                                />
                                            </div>
                                            <h1 className="text-xl font-semibold pt-2">
                                                Urban Hymns, the album that propelled The Verve into fame
                                            </h1>
                                        </div>
                                    </a>
                                </Link>
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
