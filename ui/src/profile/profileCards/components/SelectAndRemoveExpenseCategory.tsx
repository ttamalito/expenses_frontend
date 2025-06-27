import React from 'react';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';

export default function SelectAndRemoveExpenseCategory() {

  const [categories, setCategories] = React.useState<any[]>([]);

  return (
    <Box>
      <Stack spacing={1}>
        <FormControl>
          <FormLabel>Select category to Remove</FormLabel>
          <Select variant={'standard'}>
            {categories.map((category) => {
              return (
                <MenuItem
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      <Stack spacing={1}>
        <FormLabel>Category Name</FormLabel>
        <FormControl
          sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
        >
          <Input
            size="small"
            placeholder="Category Name"
            name={'name'}
            disabled={true}
            value={'Add with with onChange'}
          />
          <Input
            size="medium"
            placeholder="Description"
            sx={{ flexGrow: 1 }}
            name={'description'}
            disabled={true}
            value={'add with onChange'}
          />
        </FormControl>
      </Stack>{' '}
      {/* Category name (STACK) END*/}
    </Box>
  );
}
