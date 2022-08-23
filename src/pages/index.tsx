import { Flex, Button, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../components/Form/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type SingInFormData = {
    email: string;
    password: string;
};

const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail com formato inválido'),
    password: yup.string().required(),
});
export default function SingIn() {
    const { register, handleSubmit, formState } = useForm<SingInFormData>({
        resolver: yupResolver(signInFormSchema),
    });
    const handleSignIn: SubmitHandler<SingInFormData> = (data, event) => {
        console.log(data);
    };
    return (
        <Flex w="100vw" h="100vh" align="center" justify="center">
            <Flex
                as="form"
                flexDir="column"
                w="100%"
                maxWidth={360}
                bg="gray.800"
                p="8"
                borderRadius={8}
                onSubmit={handleSubmit(handleSignIn)}
            >
                <Stack spacing="4">
                    <Input
                        {...register('email')}
                        type="email"
                        error={formState.errors.email}
                        label="E-mail"
                        focusBorderColor="pink.500"
                        bgColor="gray.900"
                        variant="filled"
                        _hover={{
                            bgColor: 'gray.900',
                        }}
                        size="lg"
                    />
                    <Input
                        {...register('password')}
                        name="password"
                        type="password"
                        label="Password"
                        focusBorderColor="pink.500"
                        error={formState.errors.password}
                        bgColor="gray.900"
                        variant="filled"
                        _hover={{
                            bgColor: 'gray.900',
                        }}
                        size="lg"
                    />
                </Stack>
                <Button type="submit" mt="6" colorScheme="pink" size="lg" isLoading={formState.isSubmitting}>
                    Entrar
                </Button>
            </Flex>
        </Flex>
    );
}
