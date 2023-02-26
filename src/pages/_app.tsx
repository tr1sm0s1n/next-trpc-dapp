// import '@/styles/globals.css'
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { trpc } from "../utils/trpc";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default trpc.withTRPC(App);
