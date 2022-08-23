import { Box, Stack, Text } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';

interface PaginationProps {
    totalCOuntOfRegisters: number;
    registerPerPage?: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)]
        .map((_, index) => {
            return from + index + 1;
        })
        .filter((page) => page > 0);
}

export function Pagination({
    totalCOuntOfRegisters,
    currentPage = 1,
    onPageChange,
    registerPerPage = 10,
}: PaginationProps) {
    const lasPage = Math.floor(totalCOuntOfRegisters / registerPerPage);

    const previousPage = currentPage > 1 ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1) : [];

    const nexPages =
        currentPage < lasPage ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lasPage)) : [];
    return (
        <Stack direction={['column', 'row']} mt="8" justifyContent="space-between" align="center" spacing="6">
            <Box>
                <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
            </Box>
            <Stack direction="row" spacing="2">
                {currentPage > 1 + siblingsCount && (
                    <>
                        <PaginationItem onPageChange={onPageChange} number={1} />
                        {currentPage > 2 + siblingsCount && (
                            <Text color="gray.300" width="8" textAlign="center">
                                ...
                            </Text>
                        )}
                    </>
                )}
                {previousPage.length > 0 &&
                    previousPage.map((page) => <PaginationItem onPageChange={onPageChange} key={page} number={page} />)}
                <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />
                {nexPages.length > 0 &&
                    nexPages.map((page) => <PaginationItem onPageChange={onPageChange} key={page} number={page} />)}
                {currentPage + siblingsCount < lasPage && (
                    <>
                        {currentPage + 1 + siblingsCount < lasPage && (
                            <Text color="gray.300" width="8" textAlign="center">
                                ...
                            </Text>
                        )}
                        <PaginationItem onPageChange={onPageChange} number={lasPage} />
                    </>
                )}
            </Stack>
        </Stack>
    );
}
