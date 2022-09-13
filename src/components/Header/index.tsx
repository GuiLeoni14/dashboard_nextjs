import { Button, Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { RiMenu3Line } from 'react-icons/ri';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export function Header() {
    const { onOpen } = useSidebarDrawer();
    const { signOut } = useContext(AuthContext);
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });
    return (
        <Flex w="100%" as="header" maxWidth={1480} h="20" mx="auto" mt="4" align="center" px="6">
            {!isWideVersion && (
                <IconButton
                    aria-label="Open navigation"
                    icon={<Icon as={RiMenu3Line} />}
                    fontSize="24"
                    variant="unstyled"
                    onClick={onOpen}
                    mr="2"
                    display="inline-flex"
                />
            )}
            <Logo />
            {isWideVersion && <SearchBox />}
            <Button onClick={signOut} colorScheme="pink">
                Sair
            </Button>
            <Flex align="center" ml="auto">
                <NotificationsNav />
                <Profile showProfileData={isWideVersion} />
            </Flex>
        </Flex>
    );
}
