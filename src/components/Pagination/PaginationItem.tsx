import { Button, ButtonProps } from '@chakra-ui/react';

interface PaginationItemProps extends ButtonProps {
    number: number;
    onPageChange: (page: number) => void;
    isCurrent?: boolean;
}

export function PaginationItem({ isCurrent = false, number, onPageChange }: PaginationItemProps) {
    if (isCurrent) {
        return (
            <Button
                size="sm"
                fontSize="xs"
                width="4"
                colorScheme="pink"
                disabled
                _disabled={{
                    bgColor: 'pink.500',
                    cursor: 'default',
                }}
            >
                {number}
            </Button>
        );
    }
    return (
        <Button
            size="sm"
            fontSize="xs"
            width="4"
            onClick={() => onPageChange(number)}
            bgColor="gray.700"
            _hover={{
                bg: 'gray.500',
            }}
        >
            {number}
        </Button>
    );
}
