import { AuthTokenError } from './../services/errors/AuthTokenArror';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { destroyCookie, parseCookies } from 'nookies';

export function withSSRAuth<P>(fn: GetServerSideProps<P>): GetServerSideProps {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);
        if (!cookies['nextauth.token']) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }
        try {
            return await fn(ctx);
        } catch (error) {
            // so fazer esse redirect se o erro for relacionado ao nosso backend (instanceof AuthTokenError)
            if (error instanceof AuthTokenError) {
                destroyCookie(ctx, 'nextauth.token');
                destroyCookie(ctx, 'nextauth.refreshToken');
                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    },
                };
            }
        }
    };
}
