import type { AppProps } from "next/app";
import { ThemeProvider, DefaultTheme } from "styled-components";
import "../styles/roots.css";
import "../styles/globals.css";

const theme: DefaultTheme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3",
  },
};

// --- ReactTimeAgo Start
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import { Provider } from "react-redux";
import store from "../store/store";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
// --- ReactTimeAgo End

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </Head>
      <ChakraProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </>
  );
}
