import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { ToastProvider } from "react-toast-notifications";
import { PostsWrapper } from "../context/posts";
import { OwnPostsWrapper } from "../context/ownPosts";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <PostsWrapper>
        <OwnPostsWrapper>
          <ToastProvider>
            <Component {...pageProps} />
            <Toaster position={`top-right`} toastOptions={{ duration: 5000 }} />
          </ToastProvider>
        </OwnPostsWrapper>
      </PostsWrapper>
    </SessionProvider>
  );
}
export default MyApp;
