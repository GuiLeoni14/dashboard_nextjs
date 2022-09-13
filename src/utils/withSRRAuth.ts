import { AuthTokenError } from './../services/errors/AuthTokenArror';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import decode from 'jwt-decode';
import { validadeUserPermissions } from './validadeUserPermissions';

type WithSSRAuthOptions = {
    permissions: string[];
    roles: string[];
};

export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: WithSSRAuthOptions): GetServerSideProps {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);
        const token = cookies['nextauth.token'];
        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }

        if (options) {
            const user = decode<{ permissions: string[]; roles: string[] }>(token);
            const { permissions, roles } = options;

            const userHasValidPermissions = validadeUserPermissions({
                user,
                roles,
                permissions,
            });
            if (!userHasValidPermissions) {
                return {
                    redirect: {
                        destination: '/dashboard',
                        permanent: false,
                    },
                };
            }
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
