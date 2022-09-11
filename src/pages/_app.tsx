import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';
import { useRouter } from 'next/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '../services/queryClient';
import { AuthProvider } from '../contexts/AuthContext';

if (process.env.NODE_ENV === 'development') {
    //makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider theme={theme}>
                    <SidebarDrawerProvider>
                        <Component {...pageProps} key={router.asPath} />
                    </SidebarDrawerProvider>
                </ChakraProvider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </AuthProvider>
    );
}

export default MyApp;
