import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import {Provider} from 'next-auth/client';
import Nav from '../components/Nav';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
    <ThemeProvider>
      <CSSReset/>
      <Nav/>
      <Component {...pageProps} />
    </ThemeProvider>
    </Provider>
    )
}

export default MyApp
