import { Flex, Button, Stack } from '@chakra-ui/react';
import { Input } from '../components/Form/Input';

export default function SingIn() {
    return (
        <Flex w="100vw" h="100vh" align="center" justify="center">
            <Flex as="form" flexDir="column" w="100%" maxWidth={360} bg="gray.800" p="8" borderRadius={8}>
                <Stack spacing="4">
                    <Input
                        type="email"
                        label="E-mail"
                        name="email"
                        focusBorderColor="pink.500"
                        bgColor="gray.900"
                        variant="filled"
                        _hover={{
                            bgColor: 'gray.900',
                        }}
                        size="lg"
                    />
                    <Input
                        type="password"
                        name="password"
                        label="Password"
                        focusBorderColor="pink.500"
                        bgColor="gray.900"
                        variant="filled"
                        _hover={{
                            bgColor: 'gray.900',
                        }}
                        size="lg"
                    />
                </Stack>
                <Button type="submit" mt="6" colorScheme="pink" size="lg">
                    Entrar
                </Button>
            </Flex>
        </Flex>
    );
}
