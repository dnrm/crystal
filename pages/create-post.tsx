import React, { FormEvent, useRef, useCallback, useState } from "react";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useDropzone } from "react-dropzone";
import { useToasts } from "react-toast-notifications";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import router from "next/router";

// * Types

interface Post {
  title: string;
  content: string;
  user: string;
  src?: string;
}

interface Props {
  session: object;
}

const Create = ({ session }: Props) => {
  const titleRef: any = useRef();
  const contentRef: any = useRef();

  const { addToast } = useToasts();

  const [files, setFiles] = useState<FileList | null>();
  const [mediaType, setMediaType] = useState<string>();

  const onDrop = useCallback(async (acceptedFiles) => {
    if (!acceptedFiles[0].name.match(/.(jpg|jpeg|png|gif|mp4)$/i)) {
      addToast("File is not an image or video.", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (acceptedFiles[0].type === "video/mp4") {
      setMediaType("video/mp4");
    } else {
      setMediaType(acceptedFiles[0].type);
    }

    await setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  /**
   * handleSubmit
   * @param {FormEvent} e
   * @returns If input elements are empty, nothing, else it makes a POST request to API creating a new post.
   */

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (session) {
      let title = titleRef.current.value;
      let content = contentRef.current.value;

      if (title == "" || content == "") {
        addToast("Please fill out all input fields.", {
          appearance: "info",
          autoDismiss: true,
        });
        return;
      }

      try {
        let secure_url = "";

        if (files) {
          const formData = new FormData();
          formData.append("image", files[0]);
          const upload = await fetch("/api/upload-image", {
            method: "POST",
            body: formData,
          });

          const json = await upload.json();
          secure_url = json.secure_url;

          if (upload.ok) {
            console.log("Image uploaded successfully!");
            console.log(json);
          } else {
            console.error("Image upload failed.");
          }
        }
        console.log(secure_url);

        let response = await createPost({
          title,
          content,
          // @ts-ignore
          user: session.user?.email,
          src: secure_url,
        });
        console.log(response);

        if (response.ok) {
          addToast("Created post successfully :D", {
            appearance: "success",
            autoDismiss: true,
          });
          router.push("/dashboard");
        } else {
          throw new Error("Unable to create post");
        }
      } catch (e) {
        console.log("Error:", e);
        addToast("Unable to create post :(", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };

  const createPost = async ({ title, content, user, src }: Post) => {
    let api = "/api/create";

    const response = fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
        user,
        src,
      }),
    });

    return response;
  };

  return (
    <>
      <Head>
        <title>Create Post | dnrm</title>
      </Head>
      <Navbar />
      <main className="flex flex-col p-4 md:p-8">
        <header className="flex items-center justify-between">
          <h1 className="text-4xl md:text-8xl lg:text-9xl tracking-tighter font-bold text-black py-5">
            Create Post
          </h1>
        </header>
        <form onSubmit={handleSubmit}>
          <section
            id="form"
            className="grid grid-cols-1 md:grid-cols-1 mt-4 max-w-6xl mx-auto"
          >
            <div className="upload pl-0 md:pl-8 mb-4">
              <div
                {...getRootProps()}
                className={
                  (isDragActive
                    ? "bg-blue-100 border-blue-300 text-blue-500"
                    : "bg-white border-gray-400") +
                  "shadow-md col-span-1 upload-image w-full h-96 rounded-lg border-dashed border-4 hover:bg-blue-100 hover:border-blue-300 hover:text-blue-500"
                }
              >
                {!files ? (
                  <div className="flex flex-col justify-center items-center h-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={"currentColor"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={
                        "hover:text-blue-500 feather w-16 h-16 feather-upload"
                      }
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <h1
                      className={
                        "text-xl font-light text-center leading-6" +
                        (isDragActive ? "text-blue-500" : "")
                      }
                    >
                      Drop image here or{" "}
                      <span className="hover:underline font-bold">
                        select from device
                      </span>
                    </h1>
                  </div>
                ) : (
                  <>
                    <div
                      className="cross relative top-0 left-0 h-0 z-10"
                      onClick={(e: any) => {
                        e.stopPropagation();
                        setFiles(null);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 bg-gray-200 m-2 rounded-md absolute text-gray-700 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    {mediaType !== "video/mp4" ? (
                      <img
                        src={URL.createObjectURL(Array.from(files)[0])}
                        className="h-full w-full object-cover rounded-lg z-0"
                        alt=""
                      />
                    ) : (
                      <video
                        controls
                        className="h-full w-full object-cover rounded-lg z-0"
                        src={URL.createObjectURL(Array.from(files)[0])}
                      ></video>
                    )}
                  </>
                )}
              </div>
              <input
                {...getInputProps()}
                type="file"
                name="upload-image"
                id="upload-image"
                className="hidden"
              ></input>
            </div>
            <div className="mt-8 md:mt-0 pl-0 md:pl-8 col-span-2 flex flex-col justify-between items-stretch w-full">
              <div className="input-elements">
                <div className="group">
                  <h2 className="text-3xl font-semibold tracking-tighter">
                    Title
                  </h2>
                  <input
                    type="text"
                    ref={titleRef}
                    name="title"
                    placeholder="Once upon a time..."
                    className="mt-1 p-2 font-lg outline-none w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-blue-400"
                  />
                </div>
                <div className="group mt-4">
                  <h2 className="text-3xl font-semibold tracking-tighter">
                    Content
                  </h2>
                  <textarea
                    name="content"
                    id=""
                    ref={contentRef}
                    cols={30}
                    rows={16}
                    placeholder="The start of a great story..."
                    className="font-mono mt-1 p-2 font-lg outline-none w-full border-2 border-gray-300 rounded-lg shadow-md resize-none focus:border-blue-400"
                  ></textarea>
                </div>
              </div>
              <div className="buttons flex justify-end mt-2">
                <button
                  type="submit"
                  className="px-12 py-3 bg-blue-500 hover:bg-blue-600 text-white shadow-2xl rounded-md outline-none"
                >
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
        </form>
      </main>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Create;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
