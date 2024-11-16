import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import fetchTotalSpentInAMonth from "../spent/requests/fetchTotalSpentInAMonth";
import {useEffect} from "react";



interface ISpentOverAYearLineChartProps {
    upToMonthNumber: number
}

export default function SpentOverAYearLineChart({upToMonthNumber} : ISpentOverAYearLineChartProps ) {

    const [monthlyData, setMonthlyData] = React.useState<number[]>([]);

    useEffect(() => {
        fetchAllDataForLineChart(upToMonthNumber).then((data) => {
            setMonthlyData(data);
        }).catch((error) => {
            alert('There was an error fetching the monthly spent data');
            console.log(error);
        });

    }, [upToMonthNumber]);


    return (
        <LineChart
            grid={{ vertical: true, horizontal: true }}
            //xAxis={[{ data: ["January", "1", "1", "1", "1", "1", "1", "1", "1"] }]}
             xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
            series={[
                {
                    data: monthlyData, // corresponds to y values
                    valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
                },
                // {
                //     data: [null, null, null, null, 5.5, 2, 8.5, 1.5, 5],
                // },
                // {
                //     data: [7, 8, 5, 4, null, null, 2, 5.5, 1],
                //     valueFormatter: (value) => (value == null ? '?' : value.toString()),
                // },
                // {
                //     data: [25, 8, 5, 4, null, null, 2, 5.5, 1],
                //     valueFormatter: (value) => (value == null ? '?' : value.toString()),
                // },
            ]}
            height={200}
            margin={{ top: 10, bottom: 20 }}
        />
    );
}


async function fetchAllDataForLineChart(upToMonthNumber: number) {

    const spentMonthly = [];

    for (let i = 1; i <= upToMonthNumber; i++) {
        const response = await fetchTotalSpentInAMonth(2024, i, 'all');
        const positiveNumber = Math.abs(response.data);
        spentMonthly.push(positiveNumber);
    }

    return spentMonthly;
}