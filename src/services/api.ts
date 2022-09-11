import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../contexts/AuthContext';

interface AxiosErrorResponse {
    code?: string;
}

let cookies = parseCookies();
let isRefreshing = false; // fazer as chamadas para a api apenas um única fez enquanto o token não está válido
let failedRequestsQueue = [];

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
    (error: AxiosError<AxiosErrorResponse>) => {
        if (error.response.status === 401) {
            if ((error.response.data?.code as string) === 'token.expired') {
                // renovar
                cookies = parseCookies();
                const { 'nextauth.refreshToken': refreshToken } = cookies;
                const originalConfig = error.config; // é toda a configuração que foi feita para o backend(contém todas as informações para realizar um re-tentativa)

                if (!isRefreshing) {
                    isRefreshing = true;

                    api.post('http://localhost:3333/refresh', {
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

                            failedRequestsQueue.forEach((request) => request.onSuccess(token));
                            failedRequestsQueue = [];
                        })
                        .catch((err) => {
                            failedRequestsQueue.forEach((request) => request.onFailure(err));
                            failedRequestsQueue = [];
                        })
                        .finally(() => {
                            isRefreshing = false;
                        });
                }

                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({
                        onSuccess: (token: string) => {
                            originalConfig.headers['Authorization'] = `Bearer ${token}`;
                            resolve(api(originalConfig)); // fazer com que o axios aguarde, pois não suporta async/await
                        },
                        onFailure: (err: AxiosError) => {
                            reject(err);
                        },
                    });
                });
            } else {
                signOut();
            }
        }
        return Promise.reject(error); // não houve tratativa então devemos deixar o erro do axios continuar
    },
);
