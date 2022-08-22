import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

export function Profile() {
    return (
        <Flex align="center">
            <Box mr="4" textAlign="right">
                <Text>Guilherme Leoni</Text>
                <Text color="gray.300" fontSize="small">
                    guileonidev@gmail.com
                </Text>
            </Box>
            <Avatar size="md" name="Guilherme Leoni" src="https://github.com/GuiLeoni14.png"></Avatar>
        </Flex>
    );
}
