import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import GaugeChartBudget from '../charts/GaugeChartBudget';
import SpentOverAYearLineChart from '../charts/SpentOverAYearLineChart';

const Item = styled(Paper)(({ theme }) => {
  return {
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  };
});

interface IHomeGridComponentProps {
  fetchTotalSpentFlag: boolean;
}

export default function HomeGridComponent({
  fetchTotalSpentFlag,
}: IHomeGridComponentProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 8, md: 8, sm: 8 }}>
          <h5>Monthly Spent over a year</h5>
          <SpentOverAYearLineChart
            upToMonthNumber={12}
          ></SpentOverAYearLineChart>
        </Grid>
        <Grid size={{ xs: 4, md: 4, sm: 4 }}>
          <GaugeChartBudget
            expenseType={undefined}
            width={200}
            height={200}
            yearFlag={false}
            updateFlag={fetchTotalSpentFlag}
          />
        </Grid>
        {/*<Grid size={{ xs: 8, md: 8, sm: 8 }}>*/}
        {/*    <Item>xs=6 md=4</Item>*/}
        {/*</Grid>*/}
        {/*<Grid size={{ xs: 8, md: 8, sm: 8 }}>*/}
        {/*    <Item>xs=6 md=8</Item>*/}
        {/*</Grid>*/}
      </Grid>
    </Box>
  );
}
