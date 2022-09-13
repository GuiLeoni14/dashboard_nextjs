import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../services/queryClient';
import { useRouter } from 'next/router';
import { api } from '../../services/apiClient';

type createUserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};
const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail com formato inválido'),
    password: yup.string().required().min(6, 'No mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
});
export default function PageCreateUser() {
    const router = useRouter();
    const createUser = useMutation(
        async (user: createUserFormData) => {
            const response = await api.post('users', {
                user: {
                    ...user,
                    created_at: new Date(),
                },
            });
            return response.data.user;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['users']); // ['users', 1] iria invalidar somente a primeira página
            },
        },
    );
    const { register, handleSubmit, formState } = useForm<createUserFormData>({
        resolver: yupResolver(createUserFormSchema),
    });
    const handleCreateUser: SubmitHandler<createUserFormData> = async (data) => {
        await createUser.mutateAsync(data);
        router.push('/users');
    };
    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Box
                    as="form"
                    onSubmit={handleSubmit(handleCreateUser)}
                    flex="1"
                    borderRadius={8}
                    bgColor="gray.800"
                    p={['6', '8']}
                >
                    <Heading size="lg" fontWeight="normal">
                        Criar usuário
                    </Heading>
                    <Divider my="6" borderColor="gray.700" />
                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                            <Input {...register('name')} error={formState.errors.name} label="Nome completo" />
                            <Input {...register('email')} error={formState.errors.email} type="email" label="E-mail" />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                            <Input
                                {...register('password')}
                                error={formState.errors.password}
                                type="password"
                                label="Senha"
                            />
                            <Input
                                {...register('password_confirmation')}
                                error={formState.errors.password_confirmation}
                                type="password"
                                label="Confirmação da senha"
                            />
                        </SimpleGrid>
                    </VStack>
                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button as="a" colorScheme="whiteAlpha">
                                    Cancelar
                                </Button>
                            </Link>
                            <Button colorScheme="pink" type="submit" isLoading={formState.isSubmitting}>
                                Salvar
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}
