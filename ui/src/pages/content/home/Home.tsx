import { Grid, Container, Title } from '@mantine/core';
import HomeLineChart from './charts/HomeLineChart';
import HomeDonutBudgetChart from './charts/HomeDonutBudgetChart';
import AddExpense from './forms/AddExpense';
import AddIncome from './forms/AddIncome';

export default function Home() {
  return (
    <Container fluid>
      <Title order={1} mb="xl">
        Dashboard
      </Title>

      {/* Charts Row */}
      <Grid mb="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <HomeLineChart />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <HomeDonutBudgetChart />
        </Grid.Col>
      </Grid>

      {/* Forms Row */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <AddExpense />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <AddIncome />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
