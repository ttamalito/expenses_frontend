import React from 'react';
import { Box, Stack, Select, TextInput, Text, Group } from '@mantine/core';

export default function SelectAndRemoveExpenseCategory() {
  const [categories, setCategories] = React.useState<any[]>([]);

  return (
    <Box>
      <Stack gap="xs">
        <Text>Select category to Remove</Text>
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
            value="Add with with onChange"
          />
          <TextInput
            size="md"
            placeholder="Description"
            style={{ flexGrow: 1 }}
            name="description"
            disabled
            value="add with onChange"
          />
        </Group>
      </Stack>{' '}
      {/* Category name (STACK) END*/}
    </Box>
  );
}
