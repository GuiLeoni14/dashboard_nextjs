import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react';
import { Header } from '../components/Header';
import dynamic from 'next/dynamic';
import { Sidebar } from '../components/Sidebar';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import { withSSRAuth } from '../utils/withSRRAuth';
import { api } from '../services/apiClient';
import { setupApiClient } from '../services/api';
const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const options = {
    chart: {
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        foreColor: theme.colors.gray[500],
    },
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        enabled: false,
    },
    xaxis: {
        type: 'datetime',
        axisBorder: {
            color: theme.colors.gray[600],
        },
        axisTicks: {
            color: theme.colors.gray[600],
        },
        categories: [
            '2021-03-18T00:00:00.00Z',
            '2021-03-19T00:00:00.00Z',
            '2021-03-20T00:00:00.00Z',
            '2021-03-21T00:00:00.00Z',
            '2021-03-22T00:00:00.00Z',
            '2021-03-23T00:00:00.00Z',
            '2021-03-24T00:00:00.00Z',
        ],
    },
    fill: {
        opacity: 0.3,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opacityFrom: 0.7,
            opacityTo: 0.3,
        },
    },
} as ApexOptions;

const series = [{ name: 'series1', data: [31, 120, 10, 28, 52, 18, 109] }];

export default function PageDashboard() {
    const [assembleGraphics, setAssembleGraphics] = useState(false);
    useEffect(() => {
        setAssembleGraphics(true);
    }, []);
    useEffect(() => {
        api.get('http://localhost:3333/me')
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    });
    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                {assembleGraphics && (
                    <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
                        <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
                            <Text fontSize="lg" mb="4">
                                Inscritos da semana
                            </Text>
                            <Chart type="area" height={160} options={options} series={series} />
                        </Box>
                        <Box p="8" bg="gray.800" borderRadius={8}>
                            <Text fontSize="lg" mb="4">
                                Taxa de abertura
                            </Text>
                            <Chart type="area" height={160} options={options} series={series} />
                        </Box>
                    </SimpleGrid>
                )}
            </Flex>
        </Flex>
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupApiClient(ctx);
    try {
        const response = await apiClient.get('http://localhost:3333/me');
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
    return {
        props: {},
    };
});
