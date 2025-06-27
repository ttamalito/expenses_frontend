import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import SelectAndEditExpenseCategory from './components/SelectAndEditExpenseCategory';
import SelectAndRemoveExpenseCategory from './components/SelectAndRemoveExpenseCategory';

export default function CategoryCard() {

  return (
    <Card
      variant={'outlined'}
      sx={{ p: 2, bgcolor: 'background.body', borderRadius: '8px' }}
    >
      <Box sx={{ mb: 1 }}>
        <Typography variant={'h3'}>User categories</Typography>
        <Typography variant={'h5'}>Add category for transactions</Typography>
      </Box>
      <Divider />
      <Stack
        direction={'row'}
        spacing={3}
        sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
      >
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
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
          {/* NAME (STACK) END*/}
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
        </Stack>{' '}
        {/* END OF STACK after all*/}
      </Stack>
      <Divider /> {/* Buttons to save the changes */}
      <br />
      <Stack direction={'row'} spacing={2} sx={{ justifyContent: 'flex-end' }}>
        <Button
          variant={'outlined'}
        >
          Cancel
        </Button>
        <Button
          variant={'contained'}
        >
          Create Category
        </Button>
      </Stack>
      <Divider> Edit Category </Divider>
      <Box sx={{ mb: 1 }}>
        <Typography variant={'h3'}>Edit categories</Typography>
        <Typography variant={'h5'}>Select category to edit</Typography>
      </Box>
      <Divider />
      <Stack
        direction={'row'}
        spacing={3}
        sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
      >
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <Stack spacing={1}>
            <FormControl>
              <FormLabel>Edit Expense or Income category</FormLabel>
              <RadioGroup row name={'categoryType'}>
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
            <SelectAndEditExpenseCategory />
          </Stack>
        </Stack>{' '}
        {/* END OF STACK after all*/}
      </Stack>
      <Divider /> {/* Buttons to save the changes */}
      <br />
      <Stack direction={'row'} spacing={2} sx={{ justifyContent: 'flex-end' }}>
        <Button
          variant={'outlined'}>
          Cancel
        </Button>
        <Button
          variant={'contained'}
        >
          Edit Category
        </Button>
      </Stack>
      <Divider>Remove Category</Divider>
      <Box sx={{ mb: 1 }}>
        <Typography variant={'h3'}>Remove categories</Typography>
        <Typography variant={'h5'}>Select category to remove</Typography>
      </Box>
      <Divider />
      <Stack
        direction={'row'}
        spacing={3}
        sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
      >
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <Stack spacing={1}>
            <FormControl>
              <FormLabel>Edit Expense or Income category</FormLabel>
              <RadioGroup row name={'categoryType'}>
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
            <SelectAndRemoveExpenseCategory />
          </Stack>
        </Stack>{' '}
        {/* END OF STACK after all*/}
      </Stack>
      <Divider /> {/* Buttons to save the changes */}
      <br />
      <Stack direction={'row'} spacing={2} sx={{ justifyContent: 'flex-end' }}>
        <Button
          variant={'outlined'}

        >
          Cancel
        </Button>
        <Button
          variant={'contained'}
        >
          Remove Category
        </Button>
      </Stack>
    </Card>
  );
}
