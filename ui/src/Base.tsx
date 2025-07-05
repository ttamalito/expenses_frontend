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
import { Button, Radio, Stack, Box, Text, Title, Container, Tooltip, Select, Group } from '@mantine/core';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import HomeGridComponent from './home/HomeGridComponent';
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
    <Title order={2}>See expenses for a specific month</Title>
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
        type="submit"
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
      <Stack>
        <Text id="date">Select a Date</Text>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              name="date"
              label="Date of the expense"
              // value={value}
              // onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Stack>
      <br />
      <Stack>
        <Text id="expeseOrIncome">
          <Title order={3}>Expense or Income?</Title>
        </Text>
        <Radio.Group name="transaction">
          <Group>
            <Radio value="expense" label="Expense" />
            <Radio value="income" label="Income" />
          </Group>
        </Radio.Group>
      </Stack>
      <br />
      <Stack style={{ minWidth: 120, marginTop: '1rem', marginBottom: '1rem' }}>
        <Tooltip
          label="Select one of the transaction types of the list down below"
          position="top"
        >
          <Text id="typeOfTransaction">Type of Transaction</Text>
        </Tooltip>
        <Select
          name="type"
          id="select-transaction-type"
          data={keysOfTypesOfTransactions.map((option) => ({
            key: option.valueOf(),
            value: types[option],
            label: option.valueOf(),
          }))}
          required
        />
      </Stack>

      <br />
      <input
        type="text"
        placeholder={'notes'}
        name={'notes'}
        autoComplete={'off'}
      />
      <br />

      <Button
        type="submit"
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
      <Title order={1}>Expenses Manager</Title>
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
      <Title order={2}>Add an expense</Title>
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
