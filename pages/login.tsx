import React from "react";
import Image from "next/image";
import src from "../images/login.jpeg";

export default function Login() {
    return (
        <main className="flex flex-col p-8">
            <header className="flex items-center justify-between">
                <h1 className="text-6xl md:text-8xl lg:text-9xl tracking-tighter font-bold text-black py-10">
                    Login
                </h1>
            </header>
                <hr className="border-1 border-gray-300" />
            <section>
                <div className="login-form w-auto h-80 flex flex-col justify-center items-center">
                    <h3 className="text-2xl">
                        Log in to view your own profile!
                    </h3>
                    <button className="bg-blue-500 p-4 rounded-lg shadow-xl text-white my-4">
                        Log in with Google
                    </button>
                </div>
            </section>
        </main>
    );
}
