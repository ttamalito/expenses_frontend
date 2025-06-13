import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl'; // wrap each input within a FormControl, it is used to preserve state
import FormLabel from '@mui/material/FormLabel';
import ExpensesTypesTypesDeclarations from '../utils/expensesTypesTypesDeclarations';
import types from '../utils/types';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import ToolTip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OneExpenseSummaryTypeDeclaration from './utils/types/OneExpenseSummaryType';
import dayjs from 'dayjs';
import { tokens } from '../theme';
import Typography from '@mui/material/Typography';

interface IAddOrEditExpenseFormProps {
  expense?: OneExpenseSummaryTypeDeclaration;
  submitData?: () => void;
  edit: boolean;
}

export default function AddOrEditExpenseForm({
  expense,
  submitData,
  edit,
}: IAddOrEditExpenseFormProps) {
  const colors = tokens();
  let typeKey: keyof ExpensesTypesTypesDeclarations;
  const keysOfTypesOfTransactions: (keyof ExpensesTypesTypesDeclarations)[] =
    [];
  const typesOfTransactions = [];

  for (typeKey in types) {
    keysOfTypesOfTransactions.push(typeKey);
    typesOfTransactions.push(types[typeKey]);
  }

  const amountInputField = (
    <input
      type="text"
      placeholder={'amount'}
      name={'amount'}
      autoComplete={'off'}
      defaultValue={expense?.amount}
    />
  );
  const monthInputField = (
    <input type="number" placeholder={'month'} name={'month'} />
  );
  const yearInputField = (
    <input type="number" placeholder={'year'} name={'year'} />
  );
  const dateInputField = (
    <FormControl required={true}>
      <FormLabel id="date">Select a Date</FormLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            name={'date'}
            label="Date of the expense"
            defaultValue={expense?.date ? dayjs(expense.date) : undefined}
            sx={{
              color: colors.grey[100],
            }}
            // onChange={(newValue) => setValue(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
    </FormControl>
  );
  const transactionInputField = (
    <FormControl required={true}>
      <FormLabel id="expeseOrIncome">
        <Typography variant={'h3'}>Expense or Income?</Typography>
      </FormLabel>
      <RadioGroup row name={'transaction'}>
        <FormControlLabel value="expense" control={<Radio />} label="Expense" />
        <FormControlLabel value="income" control={<Radio />} label="Income" />
      </RadioGroup>
    </FormControl>
  );
  const typeInputField = (
    <FormControl
      required={true}
      variant="standard"
      sx={{ m: 1, minWidth: 120 }}
    >
      <ToolTip
        title="Select one of the transaction types of the list down below"
        placement="top"
      >
        {/*<FormLabel id="typeOfTransaction">Type of Transaction</FormLabel>*/}
        <InputLabel id="typeOfTransaction">
          <Typography variant={'h3'}>Type of Transaction</Typography>
        </InputLabel>
      </ToolTip>
      <Select
        name={'type'}
        labelId="typeOfTransaction"
        id="select-transaction-type"
        defaultValue={expense?.type}
        //onChange={handleChange}
        //label="Helloooooooooooooooooooooooooooooo"
        variant={'standard'}
      >
        {keysOfTypesOfTransactions.map((option) => {
          return (
            <MenuItem key={option.valueOf()} value={types[option]}>
              {option.valueOf()}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
  const notesInputField = (
    <input
      type="text"
      placeholder={'notes'}
      name={'notes'}
      autoComplete={'off'}
      defaultValue={expense?.notes}
    />
  );

  const button = (
    <Button type={'submit'} variant={'contained'} color="success">
      {!edit ? 'Add an expense' : 'Edit the expense'}
    </Button>
  );

  const components = (
    <div>
      {amountInputField}
      {!edit && (
        <>
          <br />
          {monthInputField}
          <br />
          {yearInputField}
        </>
      )}
      <br />
      {dateInputField}
      <br />
      {!edit && (
        <>
          {transactionInputField}
          <br />
        </>
      )}
      {typeInputField}
      <br />
      {notesInputField}
      <br />
    </div>
  );

  return <>{components}</>;
}
