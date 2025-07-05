import React from 'react';
import IncomeCategory from '../../../models/IncomeCategory';
import { Box, Stack, Select, TextInput, Text, Group } from '@mantine/core';

export default function SelectAndRemoveIncomeCategory() {
  const [categories, setCategories] = React.useState<IncomeCategory[]>([]);
  return (
    <Box>
      <Stack gap="xs">
        <Text>Select category to remove</Text>
        <Select
          data={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
        />
      </Stack>
      <Stack gap="xs">
        <Text>Category Name</Text>
        <Group style={{ display: 'flex', gap: '0.5rem' }}>
          <TextInput
            size="sm"
            placeholder="Category Name"
            name="name"
            disabled
            value="Change with onChange"
          />
          <TextInput
            size="md"
            placeholder="Description"
            style={{ flexGrow: 1 }}
            name="description"
            disabled
            value="Change with onChange"
          />
        </Group>
      </Stack>{' '}
      {/* Category name (STACK) END*/}
      <Group gap="md"></Group>{' '}
      {/* Type of transaction and budget stack*/}
    </Box>
  );
}
