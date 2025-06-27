import types from './utils/types';
import React, { useState } from 'react';
import ExpensesTypesTypesDeclarations from './utils/expensesTypesTypesDeclarations';
import { addOneExpensePath } from './utils/requests/paths';
import {
  createErrorAlert,
  createSuccessAlert,
  defaultShowAlertWrapper,
  IShowAlertWrapper,
} from './wrappers/IShowAlertWrapper';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl'; // wrap each input within a FormControl, it is used to preserve state
import FormLabel from '@mui/material/FormLabel';
import ToolTip from '@mui/material/Tooltip';
import Select from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Container from '@mui/material/Container';
import HomeGridComponent from './home/HomeGridComponent';
import Typography from '@mui/material/Typography';
import GoToYearlySummaryForm from './home/GoToYearlySummaryForm';

/**
 * The main component of the application
 * @constructor
 */
export default function Base() {
  const [showAlert, setShowAlert] = useState<IShowAlertWrapper>(
    defaultShowAlertWrapper,
  );
  const [fetchTotalSpentFlag, setFetchTotalSpentFlag] =
    React.useState<boolean>(false);

  let typeKey: keyof ExpensesTypesTypesDeclarations;
  const keysOfTypesOfTransactions: (keyof ExpensesTypesTypesDeclarations)[] =
    [];
  const typesOfTransactions = [];

  for (typeKey in types) {
    keysOfTypesOfTransactions.push(typeKey);
    typesOfTransactions.push(types[typeKey]);
  }

  // setup the maximum for expenses and other settings
  // const setUp = <a href={'/budget/setup'}>Modify your budget</a>
  // view the expenses
  const h2 = (
    <Typography variant={'h2'}>See expenses for a specific month</Typography>
  );

  const getExpenseForMonth = (
    <form
      onSubmit={(event) => {
        expenseForAMonth(event);
      }}
    >
      <input type="number" placeholder={'month'} name={'month'} />
      <input type="number" placeholder={'year'} name={'year'} />
      <Button
        type={'submit'}
        variant={'contained'}
      >
        See Expenses
      </Button>
    </form>
  );

  // add an expense
  const form = (
    <form
      onSubmit={(event) => {
        submitData(event, setShowAlert);
        setFetchTotalSpentFlag(!fetchTotalSpentFlag);
        // create a timer for 3 seconds
        setTimeout(() => {
          setShowAlert({ alert: <></>, show: false });
        }, 3000);
      }}
    >
      <input
        type="text"
        placeholder={'amount'}
        name={'amount'}
        autoComplete={'off'}
      />
      <br />
      <input type="number" placeholder={'month'} name={'month'} />
      <input type="number" placeholder={'year'} name={'year'} />
      <br />
      <FormControl required={true}>
        <FormLabel id="date">Select a Date</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              name={'date'}
              label="Date of the expense"
              // value={value}
              // onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </FormControl>
      <br />
      <FormControl
        required={true}
        sx={{
          color: 'white',
        }}
      >
        <FormLabel id="expeseOrIncome">
          <Typography variant={'h3'}>Expense or Income?</Typography>
        </FormLabel>
        <RadioGroup row name={'transaction'}>
          <FormControlLabel
            value="expense"
            control={<Radio />}
            label="Expense"
          />
          <FormControlLabel value="income" control={<Radio />} label="Income" />
        </RadioGroup>
      </FormControl>
      <br />
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
          <InputLabel id="typeOfTransaction" sx={{ color: 'white' }}>
            Type of Transaction
          </InputLabel>
        </ToolTip>
        <Select
          name={'type'}
          labelId="typeOfTransaction"
          id="select-transaction-type"
          //value={age}
          //onChange={handleChange}
          //label="Helloooooooooooooooooooooooooooooo"
          variant={'standard'}
        >
          {keysOfTypesOfTransactions.map((option) => {
            return (
              <MenuItem
                key={option.valueOf()}
                value={types[option]}
                sx={{
                  color: 'white',
                }}
              >
                {option.valueOf()}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <br />
      <input
        type="text"
        placeholder={'notes'}
        name={'notes'}
        autoComplete={'off'}
      />
      <br />

      <Button
        type={'submit'}
        variant={'contained'}
      >
        Add Expense
      </Button>
    </form>
  );

  return (
    // <div className="app">
    //     <HomeSideBar></HomeSideBar>
    //
    //     <main className={'content'}>
    //         <HomeTopBar></HomeTopBar>

    <Container>
      {' '}
      {/* Could be container */}
      <br />
      <Typography variant={'h1'}>Expenses Manager</Typography>
      <HomeGridComponent
        fetchTotalSpentFlag={fetchTotalSpentFlag}
      ></HomeGridComponent>
      <br />
      {/*<GaugeChartBudget expenseType={undefined} width={200} height={200} yearFlag={false}*/}
      {/*                  updateFlag={fetchTotalSpentFlag}/> /!* all expenses *!/*/}
      {h2}
      <br />
      {getExpenseForMonth}
      <br />
      <GoToYearlySummaryForm></GoToYearlySummaryForm>
      <br />
      {showAlert.show && showAlert.alert}
      <br />
      <Typography variant={'h2'}>Add an expense</Typography>
      {form}
    </Container>
    //     </main>
    // </div>
  );
}

function expenseForAMonth(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const urlData = createUrlParams(event.currentTarget);
  const month = urlData.get('month');
  const year = urlData.get('year');
  window.location.href = `/expensesMonth/${month}/${year}`;
}

function submitData(
  event: React.FormEvent<HTMLFormElement>,
  setShowAlert: React.Dispatch<React.SetStateAction<IShowAlertWrapper>>,
) {
  event.preventDefault();
  const urlData = createUrlParams(event.currentTarget);
  // log the urlData
  // for (const pair of urlData) {
  //     console.log(pair[0], pair[1]);
  // }
  const url = addOneExpensePath;

  fetch(url, {
    //addExpense
    method: 'POST',
    body: urlData,
  })
    .then((res) => {
      //console.log(res);

      // get the data
      res.json().then((data) => {
        //console.log(data);
        //alert('Received response data');
        if (data.result) {
          // allgucci
          //alert('Your expense was recorded');
          const successAlert = createSuccessAlert(
            'Your expense was successfully recorded',
          );
          setShowAlert({ alert: successAlert, show: true });
          (event.target as HTMLFormElement).reset();
        } // check the response code and alert if the response is not ok
      });
    })
    .catch((err) => {
      console.error(err);
      //alert('There was an error recording your expense');
      const errorAlert = createErrorAlert(
        'There was an error recording your expense ' + err,
      );
      setShowAlert({ alert: errorAlert, show: true });
    });
} // end of submitdata

function createUrlParams(form: HTMLFormElement) {
  // get the form data
  const formData = new FormData(form);

  // create the urlParams
  const urlData = new URLSearchParams();
  for (const pair of formData) {
    const pair1 = pair[1].toString();
    urlData.append(pair[0], pair1);
  }

  return urlData;
}
