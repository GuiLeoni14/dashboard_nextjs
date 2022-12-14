import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    return (
        <ChakraProvider theme={theme}>
            <SidebarDrawerProvider>
                <Component {...pageProps} key={router.asPath} />
            </SidebarDrawerProvider>
        </ChakraProvider>
    );
}

export default MyApp;
