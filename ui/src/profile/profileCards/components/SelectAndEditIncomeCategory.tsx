import React from 'react';
import IncomeCategory from '../../../models/IncomeCategory';
import { Box, Stack, Select, TextInput, Text, Group } from '@mantine/core';

export default function SelectAndEditIncomeCategory() {
  const [categories] = React.useState<IncomeCategory[]>([]);
  return (
    <Box>
      <Stack gap="xs">
        <Text>Select category to edit</Text>
        <Select
          data={categories.map((category) => {
            return {
              value: category.id,
              label: category.name,
            };
          })}
        />
      </Stack>
      <Stack gap="xs">
        <Text>Category Name</Text>
        <Group style={{ display: 'flex', gap: '0.5rem' }}>
          <TextInput placeholder="Category Name" name="name" size="sm" />
          <TextInput
            placeholder="Description"
            style={{ flexGrow: 1 }}
            name="description"
            size="md"
          />
        </Group>
      </Stack>
      {/* Category name (STACK) END*/}
      <Group gap="md"></Group>
      {/* Type of transaction and budget stack*/}
    </Box>
  );
}
