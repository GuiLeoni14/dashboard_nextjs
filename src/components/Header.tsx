import { Flex, Icon, Input, Text } from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri';

export function Header() {
    return (
        <Flex w="100%" as="header" maxWidth={1480} h="20" mx="auto" mt="4" align="center" px="6">
            <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" w="64">
                dashgo
                <Text color="pink.500" ml="1" as="span">
                    .
                </Text>
            </Text>
            <Flex
                as="label"
                flex="1"
                py="4"
                px="8"
                ml="6"
                maxH="400"
                alignSelf="center"
                color="gray.200"
                position="relative"
                bg="gray.800"
                borderRadius="full"
            >
                <Input
                    color="gray.50"
                    variant="unstyled"
                    placeholder="Buscar na plataforma"
                    px="4"
                    mr="4"
                    _placeholder={{
                        color: 'gray.400',
                    }}
                />
                <Icon as={RiSearchLine} fontSize="20" />
            </Flex>
        </Flex>
    );
}
