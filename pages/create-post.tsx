import React from "react";
import { signOut, useSession } from "next-auth/client";
import Navbar from "../components/Navbar";

const CreatePost = () => {
    const [session] = useSession();

    return (
        <>
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
                    <div className="col-span-1 upload-image w-full h-96 bg-gray-100 rounded-lg border-dashed border-gray-400 border-4 flex justify-center items-center">
                        <h1 className="text-3xl font-light">Upload Image</h1>
                    </div>
                    <div className="input-elements px-8 col-span-2">
                        <div className="group">
                            <h2 className="text-4xl font-semibold">Title</h2>
                            <input
                                type="text"
                                placeholder="Title"
                                className="mt-1 p-2 font-lg outline-none w-full border-2 border-gray-400 rounded-lg"
                            />
                        </div>
                        <div className="group mt-4">
                            <h2 className="text-4xl font-semibold">Description</h2>
                            <input
                                type="text"
                                placeholder="Description"
                                className="mt-1 p-2 font-lg outline-none w-full border-2 border-gray-400 rounded-lg"
                            />
                        </div>
                        <div className="group mt-4">
                            <h2 className="text-4xl font-semibold">Tags</h2>
                            <input
                                type="text"
                                placeholder="Tags"
                                className="mt-1 p-2 font-lg outline-none w-full border-2 border-gray-400 rounded-lg"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default CreatePost;
