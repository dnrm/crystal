import React, { useState, useEffect } from "react";
import Head from "next/head";
import { getSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-hot-toast";
import { SpinnerCircular } from "spinners-react";
import { MongoClient } from "mongodb";
import Image from "next/image";
import { connectToDatabase } from "../lib/mongodb-old";

const Account = ({ session, user }: any) => {
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [error, setError] = useState("");

  const [updating, setUpdating] = useState(false);

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
    validateUsername(e.target.value);
  };

  const handleBioChange = (e: any) => {
    setBio(e.target.value);
  };

  const validateUsername = (name: string) => {
    console.log(name.length);
    if (!name.match(/^[a-zA-Z0-9_]+$/)) {
      setError("Username can only contain letters, numbers and underscores");
      return false;
    } else if (name.length > 21) {
      setError("Username can only be 21 characters or less");
    } else {
      setError("");
      return true;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const response = await fetch("/api/update-user", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: username,
          name: name,
          bio: bio,
        }),
      });

      const json = await response.json();

      if (response.status === 200) {
        toast.success("Successfully updated user!");
        setUpdating(false);
      } else {
        throw new Error(json.error);
      }
    } catch (e) {
      toast.error("Error updating user: " + e);
      setUpdating(false);
    }
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
        <div className="mt-8 profile-picture bg-cover h-48">
          <div
            className="p-4 flex gap-4 justify-start items-center w-full h-full"
            style={{ backgroundImage: 'url("/trees-min.jpeg")' }}
          >
            <img
              src={user ? user.image : "https://avatars.dicebear.com/api/:sprites/:seed.svg"}
              className="ml-4 w-20 md:w-40 rounded-full border-4 border-white shadow-2xl"
              alt=""
            />
            <h1 className="text-4xl md:text-8xl font-bold text-white py-2 px-4 bg-black bg-opacity-50 rounded-lg">
              {name}
            </h1>
          </div>
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
                  autoComplete="off"
                  name="username"
                  className="w-full p-1 font-light text-xl border-2 border-gray-200 rounded-lg"
                  placeholder="Username..."
                  required={true}
                />
              </div>
              <label htmlFor="username" className="max-w-xl text-red-400">
                {error}
              </label>
            </div>
            <div className="name w-full">
              <div className="name-input flex justify-start items-center gap-8 w-full">
                <h1 className="font-bold text-4xl tracking-tighter">Name</h1>
                <input
                  value={name}
                  onChange={handleNameChange}
                  type="text"
                  name="name"
                  maxLength={30}
                  className="w-full p-1 font-light text-xl border-2 border-gray-200 rounded-lg"
                  placeholder="Name..."
                />
              </div>
              <label htmlFor="name" className="max-w-xl text-gray-500">
                Your name will appear in your profile.
              </label>
            </div>
            <div className="bio w-full">
              <div className="bio-input flex justify-start items-start gap-8 w-full">
                <h1 className="font-bold text-4xl tracking-tighter">Bio</h1>
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
              <label htmlFor="bio" className="max-w-xl text-gray-500">
                Your bio will appear in your profile. It is like a description
                for your account.
              </label>
            </div>
          </div>
          <div className="save-button mt-8">
            <button
              type="submit"
              disabled={error ? true : false}
              className="flex px-36 justify-center items-center p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 h-12 w-36 disabled:bg-blue-300"
            >
              {updating === false ? (
                <p>Save</p>
              ) : (
                <SpinnerCircular
                  style={{ height: "100%" }}
                  thickness={200}
                  speed={100}
                  color="rgba(255, 255, 255, 1)"
                  secondaryColor="rgba(0, 0, 0, 0.3)"
                />
              )}
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

  const { client } = await connectToDatabase();

  if (session) {
    const email = session?.user?.email;
    const db = client.db("auth");
    let user = await db.collection("users").findOne({ email });
    user = JSON.parse(JSON.stringify(user));
    return {
      props: {
        session,
        user,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
