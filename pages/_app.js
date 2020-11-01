import Head from "next/head";

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
            href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
            rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
 