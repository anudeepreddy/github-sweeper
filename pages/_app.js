import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import {Provider} from 'next-auth/client';
import Nav from '../components/Nav';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
    <Head>
      <script data-name="BMC-Widget" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="anudeepc" data-description="Support me on Buy me a coffee!" data-message="Thank you for visiting. You can now buy me a coffee!" data-color="#5F7FFF" data-position="right" data-x_margin="18" data-y_margin="18"></script>  
    </Head> 
    <ThemeProvider>
      <CSSReset/>
      <Nav/>
      <Component {...pageProps} />
    </ThemeProvider>
    </Provider>
    )
}

export default MyApp
