import { ColorModeScript } from '@chakra-ui/react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { theme } from '../styles/theme';
export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="pt-BR">
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap"
                        rel="stylesheet"
                    />
                    <link rel="shortcut icon" href="/favicon.png" type="image/png" />
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
