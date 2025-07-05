import { Box, Divider, SimpleGrid, Button, Stack, Container, Group } from '@mantine/core';
import BudgetHeader from './components/BudgetHeader';
import CategoryBudgetCard from './components/CategoryBudgetCard';
import CategoryBudget from './models/CategoryBudget';

export default function Budget() {
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
    <Box style={{ flex: 1, width: '100%', flexGrow: 1 }} component="form">
      <BudgetHeader totalBudget={1000} />
      <Divider />
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {budgetCategories.map((category) => (
          <CategoryBudgetCard key={category.name} category={category} />
        ))}
      </SimpleGrid>
      <Divider />
      <br />
      <Container>
        <Group position="right" spacing="md">
          <Button variant="outline">
            Cancel
          </Button>
          <Button>
            Save
          </Button>
        </Group>
      </Container>
    </Box>
  );
}
