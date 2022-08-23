import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';

type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
};

type UserResponseQuery = {
    users: User[];
};

export const getUsers = async (): Promise<User[]> => {
    const response = await api.get<UserResponseQuery>('users');
    const users = response.data.users.map((user) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            }),
        };
    });
    return users;
};

export const useUsers = () => {
    return useQuery(['users'], getUsers, {
        staleTime: 1000 * 5, // 5 second
    });
};
