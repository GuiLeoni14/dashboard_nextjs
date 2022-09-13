import Router from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { api } from '../services/apiClient';

type User = {
    email: string;
    permissions: string[];
    roles: string[];
};

type SingInCredentials = {
    email: string;
    password: string;
};

type AuthContextData = {
    signIn(credentials: SingInCredentials): Promise<void>;
    signOut(): void;
    user: User;
    isAuthenticated: boolean;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
    // deslogar o usuário, pois se caiu nessa catch o token está incorreto e o refreshToken não vai ser executado
    destroyCookie(undefined, 'nextauth.token');
    destroyCookie(undefined, 'nextauth.refreshToken');

    authChannel.postMessage('signOut');

    Router.push('/');
}
export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;

    useEffect(() => {
        authChannel = new BroadcastChannel('auth');

        authChannel.onmessage = (message) => {
            switch (message.data) {
                case 'signOut':
                    signOut();
                    authChannel.close();
                    break;
                default:
                    break;
            }
        };
    }, []);

    useEffect(() => {
        const { 'nextauth.token': token } = parseCookies();
        if (token) {
            api.get('http://localhost:3333/me')
                .then((response) => {
                    const { email, permissions, roles } = response.data;
                    setUser({ email, permissions, roles });
                })
                .catch(() => {
                    // deslogar o usuário, pois se caiu nessa catch o token está incorreto e o refreshToken não vai ser executado
                    signOut();
                });
        }
    }, []);

    const signIn = async ({ email, password }: SingInCredentials) => {
        try {
            const response = await api.post('http://localhost:3333/sessions', { email, password });

            const { token, refreshToken, permissions, roles } = response.data;

            setCookie(undefined, 'nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/', // quais caminhos da minha aplicação vão ter acesso ao cookie
            });

            setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/', // quais caminhos da minha aplicação vão ter acesso ao cookie
            });

            setUser({
                email,
                permissions,
                roles,
            });
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            Router.push('/dashboard');
        } catch (error) {
            console.log(error);
        }
    };
    return <AuthContext.Provider value={{ isAuthenticated, signIn, user, signOut }}>{children}</AuthContext.Provider>;
}
