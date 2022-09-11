import "../styles/globals.css";
import { motion } from "framer-motion";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import type { NextComponentType } from "next";
import { PostsWrapper } from "../context/posts";
import { SessionProvider } from "next-auth/react";
import { OwnPostsWrapper } from "../context/ownPosts";

type AppPropsWithSession = AppProps & {
  pageProps: NextComponentType & { session?: any };
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppPropsWithSession) {
  return (
    <SessionProvider session={session}>
      <PostsWrapper>
        <OwnPostsWrapper>
          <motion.div
            key={router.route}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Component {...pageProps} />
          </motion.div>
          <Toaster position={`top-right`} toastOptions={{ duration: 5000 }} />
        </OwnPostsWrapper>
      </PostsWrapper>
    </SessionProvider>
  );
}
export default MyApp;
