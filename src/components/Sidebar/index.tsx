import {
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useBreakpointValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { SidebarNav } from './SidebarNav';

export function Sidebar() {
    const { isOpen, onClose } = useSidebarDrawer();
    const [isClientSide, setIsClientSide] = useState(false); // tive que colocar esse verificação para retirar o bug, pois sempre isDrawerSidebar começa true
    const isDrawerSidebar = useBreakpointValue({
        base: true,
        lg: false,
    });
    useEffect(() => {
        setIsClientSide(true);
    }, []);
    // useEffect(() => {
    //     console.log(isDrawerSidebar);
    // }, [isDrawerSidebar]);
    if (isDrawerSidebar) {
        return (
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay>
                    <DrawerContent bg="gray.800" p="4">
                        <DrawerCloseButton mt="6" />
                        <DrawerHeader>Navegação</DrawerHeader>
                        <DrawerBody>
                            <SidebarNav />
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        );
    }
    return (
        <Box as="aside" w="64" mr="6">
            <SidebarNav />
        </Box>
    );
}
