import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import { tokens } from '../../theme';
import CategoryBudget from '../models/CategoryBudget';

interface ICategoryBudgetCardProps {
  category: CategoryBudget;
}

export default function CategoryBudgetCard({
  category,
}: ICategoryBudgetCardProps) {
  const colors = tokens();
  return (
    <Card
      variant={'outlined'}
      sx={{ p: 2, bgcolor: 'background.body', borderRadius: '8px' }}
    >
      <Box sx={{ mb: 1 }}>
        <Typography variant={'h3'}>{category.name}</Typography>
        <Typography variant={'h5'}>
          {'Monthly budget for: ' + category.name}
        </Typography>
      </Box>
      <Divider />
      <Stack direction="row" spacing={2}>
        <FormControl sx={{ flexGrow: 1 }}>
          <FormLabel>Budget</FormLabel>
          <Input
            size="small"
            type="number"
            // startDecorator={<EmailRoundedIcon />}
            placeholder="Budget for category"
            defaultValue={category.budget}
            sx={{ flexGrow: 1, color: colors.grey[100] }}
          />
        </FormControl>
      </Stack>
    </Card>
  );
}
