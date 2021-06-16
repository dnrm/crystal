import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import Navbar from "../components/Navbar";

export default function Login() {
    const [session] = useSession();

    return (
        <>
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
                        <h1 className="text-2xl md:text-4xl lg:text-4xl tracking-tighter font-bold text-black pt-8 pb-2">
                            {/* @ts-ignore */}
                            Hello, {session.user.name}
                        </h1>
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
