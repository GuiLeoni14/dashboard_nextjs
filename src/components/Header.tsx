import { Avatar, Box, Flex, HStack, Icon, Input, Text } from '@chakra-ui/react';
import { RiNotificationLine, RiSearchLine, RiUserAddLine } from 'react-icons/ri';

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
                maxW="400"
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
            <Flex align="center" ml="auto">
                <HStack spacing="8" mx="8" pr="8" py="1" color="gray.300" borderRightWidth={1} borderColor="gray.700">
                    <Icon as={RiNotificationLine} fontSize="20" />
                    <Icon as={RiUserAddLine} fontSize="20" />
                </HStack>
                <Flex align="center">
                    <Box mr="4" textAlign="right">
                        <Text>Guilherme Leoni</Text>
                        <Text color="gray.300" fontSize="small">
                            guileonidev@gmail.com
                        </Text>
                    </Box>
                    <Avatar size="md" name="Guilherme Leoni" src="https://github.com/GuiLeoni14.png"></Avatar>
                </Flex>
            </Flex>
        </Flex>
    );
}