import React from "react";
import { signOut, useSession } from "next-auth/client";
import Navbar from "../components/Navbar";
import Head from "next/head";

const CreatePost = () => {
    const [session] = useSession();

    return (
        <>
            <Head>
                <title>Create Post | dnrm</title>
            </Head>
            <div className="gradient-1 filter blur-3xl bg-teal opacity-20 absolute w-1/2 h-56 rounded-r-full -top-10 -left-8 -z-10"></div>
            <div className="gradient-1 filter blur-3xl bg-neon opacity-20 absolute w-96 h-2/3 top-28 -left-16 -z-10"></div>
            <div className="gradient-1 filter blur-3xl bg-red-400 opacity-40 absolute w-96 h-72 rounded-r-full top-20 left-32 -z-10"></div>
            <Navbar />
            <main className="flex flex-col p-8">
                <header className="flex items-center justify-between">
                    <h1 className="text-4xl md:text-8xl lg:text-9xl tracking-tighter font-bold text-black py-5">
                        Create Post
                    </h1>
                </header>
                <section
                    id="form"
                    className="grid grid-cols-1 md:grid-cols-3 mt-4"
                >
                    <div className="upload">
                        <div className="shadow-md col-span-1 upload-image w-full h-96 bg-white rounded-lg border-dashed border-gray-400 border-2 flex flex-col justify-center items-center hover:bg-blue-100 hover:border-blue-300 hover:text-blue-500">
                            <img src={"../images/upload.svg"} alt="" />
                            <h1 className="text-xl font-light text-center leading-6">
                                Drop image here or{" "}
                                <label
                                    htmlFor="upload-image"
                                    className="hover:underline font-bold"
                                >
                                    select from device
                                </label>
                            </h1>
                        </div>
                        <input
                            type="file"
                            name="upload-image"
                            id="upload-image"
                            className="hidden"
                        ></input>
                    </div>
                    <div className="pl-8 col-span-2 flex flex-col justify-between items-stretch w-full">
                        <div className="input-elements">
                            <div className="group">
                                <h2 className="text-3xl font-semibold tracking-tighter">
                                    Title
                                </h2>
                                <input
                                    type="text"
                                    placeholder="Once upon a time..."
                                    className="mt-1 p-2 font-lg outline-none w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-blue-400"
                                />
                            </div>
                            <div className="group mt-4">
                                <h2 className="text-3xl font-semibold tracking-tighter">
                                    Description
                                </h2>
                                <textarea
                                    name=""
                                    id=""
                                    cols={30}
                                    rows={5}
                                    placeholder="The start of a great story..."
                                    className="mt-1 p-2 font-lg outline-none w-full border-2 border-gray-300 rounded-lg shadow-md resize-none focus:border-blue-400"
                                ></textarea>
                            </div>
                        </div>
                        <div className="buttons flex justify-end">
                            <button className="px-12 py-3 bg-blue-500 hover:bg-blue-600 text-white shadow-2xl rounded-md outline-none">
                                Post
                            </button>
                            <button className="ml-2 p-3 bg-white hover:bg-gray-200 hover:shadow-none shadow-2xl rounded-md outline-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default CreatePost;
