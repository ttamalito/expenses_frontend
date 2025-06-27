import React from 'react';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import MenuItem from '@mui/material/MenuItem';

export default function SelectAndEditExpenseCategory() {
  const [categories, setCategories] = React.useState<any[]>([]);

  return (
    <Box>
      <Stack spacing={1}>
        <FormControl>
          <FormLabel>Select category to edit</FormLabel>
          <Select variant={'standard'}>
            {categories.map((category) => {
              return (
                <MenuItem key={category.id} value={category.id}>
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
          <Input size="small" placeholder="Category Name" name={'name'} />
          <Input
            size="medium"
            placeholder="Description"
            sx={{ flexGrow: 1 }}
            name={'description'}
          />
        </FormControl>
      </Stack>{' '}
      {/* Category name (STACK) END*/}
      <Stack direction="row" spacing={2}>
        <FormControl>
          <FormLabel>Transaction</FormLabel>
          <RadioGroup row name={'transaction'}>
            <FormControlLabel
              value="expense"
              control={<Radio />}
              label="Expense"
            />
            <FormControlLabel
              value="income"
              control={<Radio />}
              label="Income"
            />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ flexGrow: 1 }}>
          <FormLabel>Budget</FormLabel>
          <Input
            size="small"
            type="number"
            // startDecorator={<EmailRoundedIcon />}
            placeholder="Budget for category"
            defaultValue="0"
            sx={{ flexGrow: 1 }}
          />
        </FormControl>
      </Stack>{' '}
      {/* Type of transaction and budget stack*/}
    </Box>
  );
}
