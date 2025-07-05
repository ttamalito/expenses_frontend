import React from 'react';
import { Box, Stack, Select, TextInput, Text, Group, Radio } from '@mantine/core';

export default function SelectAndEditExpenseCategory() {
  const [categories, setCategories] = React.useState<any[]>([]);

  return (
    <Box>
      <Stack gap="xs">
        <Text>Select category to edit</Text>
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
          <TextInput size="sm" placeholder="Category Name" name="name" />
          <TextInput
            size="md"
            placeholder="Description"
            style={{ flexGrow: 1 }}
            name="description"
          />
        </Group>
      </Stack>{' '}
      {/* Category name (STACK) END*/}
      <Group gap="md">
        <Stack gap="xs">
          <Text>Transaction</Text>
          <Radio.Group name="transaction">
            <Group>
              <Radio value="expense" label="Expense" />
              <Radio value="income" label="Income" />
            </Group>
          </Radio.Group>
        </Stack>
        <Stack gap="xs" style={{ flexGrow: 1 }}>
          <Text>Budget</Text>
          <TextInput
            size="sm"
            type="number"
            placeholder="Budget for category"
            defaultValue="0"
            style={{ flexGrow: 1 }}
          />
        </Stack>
      </Group>{' '}
      {/* Type of transaction and budget stack*/}
    </Box>
  );
}
