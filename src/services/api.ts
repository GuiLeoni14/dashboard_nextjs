import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';

interface AxiosErrorResponse {
    code?: string;
}

let cookies = parseCookies();
export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        Authorization: `Bearer ${cookies['nextauth.token']}`,
    },
});

// acima só executa quando usuário abre a tela pela primeira vez, abaixo executa todas as vezes

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError<AxiosErrorResponse>) => {
        if (error.response.status === 401) {
            if ((error.response.data?.code as string) === 'token.expired') {
                // renovar
                cookies = parseCookies();
                const { 'nextauth.refreshToken': refreshToken } = cookies;

                await api
                    .post('http://localhost:3333/refresh', {
                        refreshToken,
                    })
                    .then((response) => {
                        const { token } = response.data;

                        setCookie(undefined, 'nextauth.token', token, {
                            maxAge: 60 * 60 * 24 * 30, // 30 days
                            path: '/', // quais caminhos da minha aplicação vão ter acesso ao cookie
                        });

                        setCookie(undefined, 'nextauth.refreshToken', response.data.refreshToken, {
                            maxAge: 60 * 60 * 24 * 30, // 30 days
                            path: '/', // quais caminhos da minha aplicação vão ter acesso ao cookie
                        });

                        api.defaults.headers['Authorization'] = `Bearer ${token}`;
                    });
            } else {
                // deslogar
            }
        }
        console.log(error.response.status);
    },
);
