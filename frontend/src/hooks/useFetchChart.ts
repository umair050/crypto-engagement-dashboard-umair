'use client'
import {fetchChart, fetchHome, fetchTable} from "@/services/BACKEND/useBACKEND";
import React from "react";

export const useFetchCharts = () => {
    const [data, setData] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        (async () => {
            setLoading(true);
            const res = await fetchHome();
            console.log("chart",res)
            if (res === null) {
                setLoading(false);
                setError("Error in fetch");
                setData(null);
                return;
            }

            const fetchChartPromises = res.coins.map(async (coin: any) => {
                const cres = await fetchChart(coin);
                console.log('cres',cres)
                if (cres !== null) {
                    return { coin, data: { dates: cres.dates, prices: cres.prices } };
                }
                return null;
            });

            try {
                const chartData = await Promise.all(fetchChartPromises);
                const dres = chartData.reduce((acc, chart) => {
                    if (chart !== null) {
                        acc[chart.coin] = chart.data;
                    }
                    return acc;
                }, {});
                setData(dres);
                setError(null);
            } catch (err) {
                setError("Error in fetching charts");
                setData(null);
            }

            setLoading(false);
        })();
    }, []);

    return { data, loading, error };
};
