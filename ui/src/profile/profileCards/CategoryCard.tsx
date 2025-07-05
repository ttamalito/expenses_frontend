import React from 'react';
import {
  Paper,
  Box,
  Text,
  Title,
  Divider,
  Stack,
  Group,
  TextInput,
  Button,
  Radio,
} from '@mantine/core';
import SelectAndEditExpenseCategory from './components/SelectAndEditExpenseCategory';
import SelectAndRemoveExpenseCategory from './components/SelectAndRemoveExpenseCategory';

export default function CategoryCard() {
  return (
    <Paper withBorder p="md" radius="md">
      <Box mb="xs">
        <Title order={3}>User categories</Title>
        <Text size="sm">Add category for transactions</Text>
      </Box>
      <Divider />
      <Stack
        direction="row"
        gap="md"
        style={{ display: 'flex', marginBlock: '0.5rem' }}
        visibleFrom="md"
      >
        <Stack gap="md" style={{ flexGrow: 1 }}>
          <Stack gap="xs">
            <Text>Category Name</Text>
            <Group grow>
              <TextInput size="sm" placeholder="Category Name" name="name" />
              <TextInput
                size="md"
                placeholder="Description"
                style={{ flexGrow: 1 }}
                name="description"
              />
            </Group>
          </Stack>
          {/* NAME (STACK) END*/}
          <Group grow>
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
          </Group>
          {/* Type of transaction and budget stack*/}
        </Stack>
        {/* END OF STACK after all*/}
      </Stack>
      <Divider /> {/* Buttons to save the changes */}
      <Group justify="flex-end" mt="md">
        <Button variant="outline">Cancel</Button>
        <Button>Create Category</Button>
      </Group>
      <Divider label="Edit Category" labelPosition="center" my="md" />
      <Box mb="xs">
        <Title order={3}>Edit categories</Title>
        <Text size="sm">Select category to edit</Text>
      </Box>
      <Divider />
      <Stack
        direction="row"
        gap="md"
        style={{ display: 'flex', marginBlock: '0.5rem' }}
        visibleFrom="md"
      >
        <Stack gap="md" style={{ flexGrow: 1 }}>
          <Stack gap="xs">
            <Text>Edit Expense or Income category</Text>
            <Radio.Group name="categoryType">
              <Group>
                <Radio value="expense" label="Expense" />
                <Radio value="income" label="Income" />
              </Group>
            </Radio.Group>
            <SelectAndEditExpenseCategory />
          </Stack>
        </Stack>
        {/* END OF STACK after all*/}
      </Stack>
      <Divider /> {/* Buttons to save the changes */}
      <Group justify="flex-end" mt="md">
        <Button variant="outline">Cancel</Button>
        <Button>Edit Category</Button>
      </Group>
      <Divider label="Remove Category" labelPosition="center" my="md" />
      <Box mb="xs">
        <Title order={3}>Remove categories</Title>
        <Text size="sm">Select category to remove</Text>
      </Box>
      <Divider />
      <Stack
        direction="row"
        gap="md"
        style={{ display: 'flex', marginBlock: '0.5rem' }}
        visibleFrom="md"
      >
        <Stack gap="md" style={{ flexGrow: 1 }}>
          <Stack gap="xs">
            <Text>Edit Expense or Income category</Text>
            <Radio.Group name="categoryType">
              <Group>
                <Radio value="expense" label="Expense" />
                <Radio value="income" label="Income" />
              </Group>
            </Radio.Group>
            <SelectAndRemoveExpenseCategory />
          </Stack>
        </Stack>
        {/* END OF STACK after all*/}
      </Stack>
      <Divider /> {/* Buttons to save the changes */}
      <Group justify="flex-end" mt="md">
        <Button variant="outline">Cancel</Button>
        <Button>Remove Category</Button>
      </Group>
    </Paper>
  );
}
