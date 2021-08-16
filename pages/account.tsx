import React, { useState, useEffect } from "react";
import Head from "next/head";
import { getSession } from "next-auth/client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useToasts } from "react-toast-notifications";

const Account = ({ session }: any) => {
    const [name, setName] = useState(session?.user?.name);
    const [username, setUsername] = useState();
    const [bio, setBio] = useState();

    const { addToast } = useToasts();

    useEffect(() => {
        const get = async () => {
            const response = await fetch("/api/get-user");
            const json = await response.json();
            setUsername(json.username ? json.username : "");
            setName(json.name ? json.name : "");
            setBio(json.bio ? json.bio : "");
        };

        get();
    }, []);

    const handleNameChange = (e: any) => {
        setName(e.target.value);
    };

    const handleUsernameChange = (e: any) => {
        setUsername(e.target.value);
    };

    const handleBioChange = (e: any) => {
        setBio(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(e);

        const response = await fetch("/api/update-user", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                username: username,
                name: name,
                bio: bio
            }),
        });

        if (response.ok) {
            addToast('success', {
                appearance: 'success',
                autoDismiss: true
            })
        }

        const json = await response.json();
        console.log(json);
    };

    return (
        <>
            <Head>
                <title>My Account | Crystal</title>
            </Head>
            <Navbar />
            <main className="flex flex-col p-8">
                <header className="flex items-center justify-between">
                    <h1 className="text-4xl md:text-8xl lg:text-9xl tracking-tighter font-bold text-black py-5">
                        My Account
                    </h1>
                </header>
                <hr className="border-1 border-gray-300" />
                <div
                    className="flex justify-start gap-8 items-center mt-8 profile-picture p-4 bg-cover"
                    style={{
                        backgroundImage:
                            'url("https://source.unsplash.com/collection/94997000/)',
                    }}
                >
                    <img
                        src={session ? session?.user?.image : ""}
                        className="ml-4 w-40 rounded-full border-4 border-white shadow-2xl"
                        alt=""
                    />
                    <h1 className="text-8xl font-bold text-white py-2 px-4 bg-black bg-opacity-50 rounded-lg">
                        {name}
                    </h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="account-information mt-8 flex justify-center items-start gap-8 flex-col max-w-4xl">
                        <div className="username w-full">
                            <div className="username-input flex justify-start items-center gap-8 w-full">
                                <h1 className="font-bold text-4xl tracking-tighter">
                                    Username
                                </h1>
                                <input
                                    value={username}
                                    onChange={handleUsernameChange}
                                    type="text"
                                    name="username"
                                    className="w-full p-1 font-light text-xl border-2 border-gray-200 rounded-lg"
                                    placeholder="Username..."
                                />
                            </div>
                            <label
                                htmlFor="username"
                                className="max-w-xl text-gray-500"
                            >
                                Your username is the unique identifier for your
                                account. Give people your username so they can
                                follow you!
                            </label>
                        </div>
                        <div className="name w-full">
                            <div className="name-input flex justify-start items-center gap-8 w-full">
                                <h1 className="font-bold text-4xl tracking-tighter">
                                    Name
                                </h1>
                                <input
                                    value={name}
                                    onChange={handleNameChange}
                                    type="text"
                                    name="name"
                                    className="w-full p-1 font-light text-xl border-2 border-gray-200 rounded-lg"
                                    placeholder="Name..."
                                />
                            </div>
                            <label
                                htmlFor="name"
                                className="max-w-xl text-gray-500"
                            >
                                Your name will appear in your profile.
                            </label>
                        </div>
                        <div className="bio w-full">
                            <div className="bio-input flex justify-start items-start gap-8 w-full">
                                <h1 className="font-bold text-4xl tracking-tighter">
                                    Bio
                                </h1>
                                <textarea
                                    onChange={handleBioChange}
                                    value={bio}
                                    cols={30}
                                    rows={3}
                                    name="bio"
                                    className="w-full p-1 font-light text-xl border-2 border-gray-200 rounded-lg resize-none"
                                    placeholder="Bio..."
                                />
                            </div>
                            <label
                                htmlFor="bio"
                                className="max-w-xl text-gray-500"
                            >
                                Your bio will appear in your profile. It is like
                                a description for your account.
                            </label>
                        </div>
                    </div>
                    <div className="save-button mt-8">
                        <button
                            type="submit"
                            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-36 py-2"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </main>
            <Footer />
        </>
    );
};

export default Account;

export async function getServerSideProps(context: any) {
    const session = await getSession(context);

    return {
        props: {
            session,
        },
    };
}
