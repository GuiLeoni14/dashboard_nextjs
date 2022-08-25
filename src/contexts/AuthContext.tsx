import Router from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';
import { parseCookies, setCookie } from 'nookies';

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
    user: User;
    isAuthenticated: boolean;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'nextauth.token': token } = parseCookies();
        if (token) {
            api.get('http://localhost:3333/me')
                .then((response) => {
                    const { email, permissions, roles } = response.data;
                    setUser({ email, permissions, roles });
                })
                .catch((error) => console.log(error));
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
    return <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>{children}</AuthContext.Provider>;
}
