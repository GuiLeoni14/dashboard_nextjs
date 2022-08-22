import { Box, Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface NavSectionProps {
    children: ReactNode;
    title: string;
}

export function NavSection({ title, children }: NavSectionProps) {
    return (
        <Box>
            <Text fontWeight="bold" color="gray.400" textTransform="uppercase">
                {title}
            </Text>
            <Stack spacing="4" mt="8" align="stretch">
                {children}
            </Stack>
        </Box>
    );
}
