import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

interface ProfileProps {
    showProfileData?: boolean;
}
export function Profile({ showProfileData = true }: ProfileProps) {
    const { user } = useContext(AuthContext);
    return (
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>{user?.email}</Text>
                    <Text color="gray.300" fontSize="small">
                        {user?.email}
                    </Text>
                </Box>
            )}
            <Avatar size="md" name="Guilherme Leoni" src="https://github.com/GuiLeoni14.png"></Avatar>
        </Flex>
    );
}
