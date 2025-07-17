import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import { createGetInitialProps } from "@mantine/emotion";
import { emotionCache } from "../emotion/cache";

export default function Document() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" type="image/x-icon" href="/img/favicon.ico" />
          <link rel="apple-touch-icon" href="/img/icons/icon-128x128.png" />

          <meta name="robots" content="noindex" />
          <meta name="theme-color" content="#46509e" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
}

const stylesServer = createEmotionServer(emotionCache);

Document.getInitialProps = createGetInitialProps(
    NextDocument,
    stylesServer
);
