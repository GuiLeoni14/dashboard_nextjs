import { UseDisclosureReturn } from '@chakra-ui/core/dist/useDisclosure';
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect } from 'react';

type SidebarDrawerContextData = UseDisclosureReturn;

export const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({ children }: { children: ReactNode }) {
    const disclosure = useDisclosure();
    const router = useRouter();
    useEffect(() => {
        disclosure.onClose();
    }, [router.asPath]);
    return <SidebarDrawerContext.Provider value={disclosure}>{children}</SidebarDrawerContext.Provider>;
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
