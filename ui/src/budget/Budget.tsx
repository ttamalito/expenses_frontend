import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { tokens } from '../theme';
import BudgetHeader from './components/BudgetHeader';
import CategoryBudgetCard from './components/CategoryBudgetCard';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import CategoryBudget from './models/CategoryBudget';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';

export default function Budget() {
  const colors = tokens();
  const category1: CategoryBudget = {
    name: 'Food',
    description: 'Food and groceries',
    budget: 100,
  };
  const category2: CategoryBudget = {
    name: 'Rent',
    description: 'Rent and utilities',
    budget: 200,
  };
  const category3: CategoryBudget = {
    name: 'Transport',
    description: 'Transportation costs',
    budget: 300,
  };
  const category4: CategoryBudget = {
    name: 'Entertainment',
    description: 'Entertainment and leisure',
    budget: 400,
  };
  const category5: CategoryBudget = {
    name: 'Health',
    description: 'Health and wellness',
    budget: 500,
  };
  const category6: CategoryBudget = {
    name: 'Education',
    description: 'Education and learning',
    budget: 600,
  };
  // const [budgetCategories, setBudgetCategories] = useState<CategoryBudget[]>([]);

  const budgetCategories = [
    category1,
    category2,
    category3,
    category4,
    category5,
    category6,
  ];
  // setBudgetCategories(categories);

  return (
    <Box sx={{ flex: 1, width: '100%', flexGrow: 1 }} component="form">
      <BudgetHeader totalBudget={1000} />
      <Divider />
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {budgetCategories.map((category) => {
          return (
            <Grid size={{ xs: 12, md: 4, lg: 4 }}>
              <CategoryBudgetCard category={category} />
            </Grid>
          );
        })}
        ;
      </Grid>
      <Divider />
      <br />
      <Container>
        <Stack
          direction={'row'}
          spacing={2}
          sx={{ justifyContent: 'flex-end' }}
        >
          <Button
            variant={'outlined'}
            sx={{
              backgroundColor: 'transparet',
              color: colors.grey[100],
              borderColor: colors.blueAccent[400],
            }}
          >
            Cancel
          </Button>
          <Button
            variant={'contained'}
            sx={{
              backgroundColor: colors.greenAccent[500],
              color: colors.grey[900],
            }}
          >
            Save
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
