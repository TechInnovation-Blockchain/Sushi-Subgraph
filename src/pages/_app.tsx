import "../styles/index.css";
import "../styles/itb.css";
import type { AppProps } from 'next/app'

import * as gtag from "../core/analytics";

import { useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import {
  ThemeProvider,
} from "@material-ui/core/styles";
import { darkModeVar } from "../core";
import { darkTheme, lightTheme } from "../theme";

import CssBaseline from "@material-ui/core/CssBaseline";
import Head from "next/head";
import fontTheme from "../styles/font";
import { useRouter } from "next/router";
// import {useLoaded} from "hooks/useLoaded";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    // Add JS
    document.body.className = (document.body.className ?? "").replace(
      "no-js",
      "js"
    );
  }, []);

  const darkMode = useReactiveVar(darkModeVar);

  const theme = React.useMemo(
    () => (darkMode ? darkTheme : lightTheme),
    [darkMode]
  );

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider
        theme={{
          ...theme,
        }}
      >
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      <style jsx global>
        {fontTheme}
      </style>
    </>
  );
}

export default MyApp;
