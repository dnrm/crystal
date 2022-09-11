import Head from "next/head";
import Image from "next/image";
import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { getSession } from "next-auth/react";
import src from "../../images/trees.jpeg";
import { GetServerSidePropsContext } from "next";

type Props = {
  message: string;
  user: {
    name: string;
    email: string;
    image: string;
    bio: string;
  };
  error: any;
};

const User = ({ message, user, error }: Props) => {
  console.log(message, user);
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Navbar />
      <div className="flex justify-start flex-col items-start w-screen h-[90vh]">
        <Head>
          <title>{user?.name} | dnrm</title>
          <meta name="description" content={`View ${user}'s profile!`} />
        </Head>
        <div className="image w-full h-72 relative">
          <Image alt="hi" src={src} layout="fill" objectFit="cover" />
        </div>
        <div className="user-info p-5">
          {!error ? (
            <div className="user">
              <div className="image">
                <img
                  src={user.image}
                  alt="Profile picture"
                  className="rounded-full border-4 border-white shadow-md w-42 h-42"
                />
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter">
                {user?.name}
              </h1>
              <p className="text-neutral-500">{user.bio || "No bio yet..."}</p>
            </div>
          ) : (
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter">
              user not found
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default User;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const client = new MongoClient(process.env.MONGODB_URI || "");
  const session = await getSession(context);
  if (!session) {
    return {
      props: {
        message: "Not logged in",
      },
    };
  }

  try {
    await client.connect();
    let db = await client.db("auth");
    console.log(context?.params?.id);
    let user = await db
      .collection("users")
      .findOne({ username: context?.params?.id });

    if (!user) {
      return {
        props: {
          error: true,
        },
      };
    }

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  } catch (e) {
    return {
      props: {
        error: true,
      },
    };
  }
}
