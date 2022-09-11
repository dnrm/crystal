import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

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
      <div className="flex justify-center items-center w-screen h-[90vh]">
        <Head>
          <title>{user?.name} | dnrm</title>
          <meta name="description" content={`View ${user}'s profile!`} />
        </Head>
        {!error ? (
          <div className="user-info text-center">
            <div className="image flex justify-center items-center">
              <img src={user.image} alt="" className="rounded-full" />
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
