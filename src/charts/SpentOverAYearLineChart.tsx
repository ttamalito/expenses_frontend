import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import fetchTotalSpentInAMonth from "../spent/requests/fetchTotalSpentInAMonth";
import {useEffect} from "react";
import {fetchTotalEarnedEachMonth} from "../spent/requests/fetchTotalEarnedEachMonth";



interface ISpentOverAYearLineChartProps {
    upToMonthNumber: number
}

export default function SpentOverAYearLineChart({upToMonthNumber} : ISpentOverAYearLineChartProps ) {

    const [monthlyData, setMonthlyData] = React.useState<number[]>([]);
    const [essentialFoodData, setEssentialFoodData] = React.useState<number[]>([]);
    const [totalEarnedData, setTotalEarnedData] = React.useState<number[]>([]);

    useEffect(() => {
        fetchAllDataForLineChart(upToMonthNumber, 'all').then((data) => {
            setMonthlyData(data);
        }).catch((error) => {
            //alert('There was an error fetching the monthly spent data');
            console.log(error);
        });
        fetchAllDataForLineChart(upToMonthNumber, 'essential_food').then((data) => {
            setEssentialFoodData(data);
        }).catch((error) => {
            //alert('There was an error fetching the monthly spent data');
            console.log(error);
        });
        fetchTotalEarnedEachMonthForLineChart(2024).then((data) => {
                console.log(data);
                let tempResult = [];
                for (let i = 0; i < data.length; i++) {
                    tempResult.push(data[i].total);
                }
                setTotalEarnedData(tempResult);
            }
        ).catch((error) => {
            console.error(error);
            });

    }, [upToMonthNumber]);


    return (
        <LineChart
            grid={{ vertical: true, horizontal: true }}
            //xAxis={[{ data: ["January", "1", "1", "1", "1", "1", "1", "1", "1"] }]}
             xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
            series={[
                {
                    id: 'France',
                    label: 'Total Spent Monthly',
                    data: monthlyData, // corresponds to y values
                    valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
                },
                {
                    id: 'essential_food',
                    label: 'Spent in Essential Food',
                    data: essentialFoodData,
                },
                {
                    id: 'total_earned',
                    label: 'Earned Monthly',
                    data: totalEarnedData,
                    valueFormatter: (value) => (value == null ? '0' : value.toString()),
                },
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


async function fetchAllDataForLineChart(upToMonthNumber: number, type: string) {

    const spentMonthly = [];

    for (let i = 1; i <= upToMonthNumber; i++) {
        const response = await fetchTotalSpentInAMonth(2024, i, type);
        const positiveNumber = Math.abs(response.data);
        spentMonthly.push(positiveNumber);
    }

    return spentMonthly;
}

async function fetchTotalEarnedEachMonthForLineChart(year: number) {
    return await fetchTotalEarnedEachMonth(year);
}