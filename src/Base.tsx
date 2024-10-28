import types from "./utils/types";
import {goToLink} from "./utils/goToLinkFromForm";
import React, {useState} from "react";
import { InfoLabel, makeStyles, Select} from "@fluentui/react-components";
import useButtonStyles from "./FluentStyles/baseButton";
import ExpensesTypesTypesDeclarations from "./utils/expensesTypesTypesDeclarations";
import {addOneExpensePath} from "./utils/requests/paths";
import {
    createErrorAlert,
    createSuccessAlert,
    defaultShowAlertWrapper,
    IShowAlertWrapper
} from "./wrappers/IShowAlertWrapper";
import GaugeChartBudget from "./charts/GaugeChartBudget";
import Button from "@mui/material/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl'; // wrap each input within a FormControl, it is used to preserve state
import FormLabel from '@mui/material/FormLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";



const useDateStyles = makeStyles({
    control: {
        maxWidth: "300px",
    },
});

/**
 * The main component of the application
 * @constructor
 */
export default function Base() {
    const [showAlert, setShowAlert] = useState<IShowAlertWrapper>(defaultShowAlertWrapper);
    const [fetchTotalSpentFlag, setFetchTotalSpentFlag] = React.useState<boolean>(false);
    const buttonStyles = useButtonStyles();


    let typeKey: keyof ExpensesTypesTypesDeclarations;
    const keysOfTypesOfTransactions: (keyof ExpensesTypesTypesDeclarations)[] = [];
    const typesOfTransactions = [];

    for (typeKey in types) {
        keysOfTypesOfTransactions.push(typeKey);
        typesOfTransactions.push(types[typeKey]);
    }


    const dateStyles = useDateStyles();
    // setup the maximum for expenses and other settings
    const setUp = <a href={'/budget/setup'}>Modify your budget</a>
    // view the expenses
    const h2 = <h2>See expenses for a specific
        month</h2>
    const getExpenseForMonth = <form
        onSubmit={(event) => {
            expenseForAMonth(event)
        }}
    >
        <input type="number" placeholder={'month'}
               name={'month'}/>
        <input type="number" placeholder={'year'}
               name={'year'}/>
        <Button
            type={'submit'} variant={'contained'} color="success">See
            Expenses</Button>
    </form>

    // add an expense
    const form = <form onSubmit={(event) => {
        submitData(event, setShowAlert);
        setFetchTotalSpentFlag(!fetchTotalSpentFlag);
        // create a timer for 3 seconds
        setTimeout(() => {
            setShowAlert({alert: <></>, show: false});
        }, 3000);
    }}>
        <input type="text"
               placeholder={'amount'}
               name={'amount'}
               autoComplete={'off'}/>
        <br/>
        <input type="number"
               placeholder={'month'}
               name={'month'}/>
        <input type="number"
               placeholder={'year'}
               name={'year'}/>
        <br/>
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
        <br/>
        <FormControl required={true}>
            <FormLabel id="expeseOrIncome">Expense or Income?</FormLabel>
                <RadioGroup
                    row
                    name={'transaction'}
                >
                    <FormControlLabel value="expense" control={<Radio/>} label="Expense"/>
                    <FormControlLabel value="income" control={<Radio/>} label="Income"/>
                </RadioGroup>
        </FormControl>
        <br/>
        <InfoLabel info="Select one of the transaction types of the list down below" htmlFor={"transaction-type"}>
            Type of Transaction
        </InfoLabel>
        <Select name={'type'} size={"small"} id={"transaction-type"} style={{width: '200px'}}>
            {keysOfTypesOfTransactions.map((option) => (
                <option key={option.valueOf()} value={types[option]}>
                    {option.valueOf()}
                </option>
            ))}
        </Select>
        <br/>
        <input type="text"
               placeholder={'notes'}
               name={'notes'}
               autoComplete={'off'}/>
        <br/>


        <Button type={'submit'} variant={'contained'} color="success">Add
            Expense</Button>

    </form>

    const yearlySummary =
        <form onSubmit={(event) => {
            goToLink(event, 'year', 'summary');
        }}>
            <label htmlFor="year">Go To Yearly
                Summary</label>
            <br/>
            <input type="number" placeholder={'year'}
                   name={'year'}/>
            <Button type={'submit'} variant={'contained'}> Go to
                Summary</Button>
        </form>


    return (
        <div className="App">
            <h1>Expenses Manager</h1>
            {setUp}
            <br/>
            <GaugeChartBudget expenseType={undefined} width={200} height={200} yearFlag={false}
                              updateFlag={fetchTotalSpentFlag}/> {/* all expenses */}
            {h2}
            <br/>
            {getExpenseForMonth}
            <br/>
            {yearlySummary}
            <br/>
            {showAlert.show && showAlert.alert}
            <br/>
            <h2 style={{color: 'black', fontSize: '24px', margin: '20px 0'}}>Add an expense</h2>
            {form}
        </div>
    );
}

function expenseForAMonth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const urlData = createUrlParams(event.currentTarget);
    const month = urlData.get('month');
    const year = urlData.get('year');
    window.location.href = `/expensesMonth/${month}/${year}`
}

function submitData(event: React.FormEvent<HTMLFormElement>, setShowAlert: React.Dispatch<React.SetStateAction<IShowAlertWrapper>>) {
    event.preventDefault();
    const urlData = createUrlParams(event.currentTarget);
    // log the urlData
    for (const pair of urlData) {
        console.log(pair[0], pair[1]);
    }
    const url = addOneExpensePath;

    fetch(url, { //addExpense
        method: "POST",
        body: urlData,
    }).then(res => {
        //console.log(res);

        // get the data
        res.json().then(data => {
            //console.log(data);
            //alert('Received response data');
            if (data.result) {
                // allgucci
                //alert('Your expense was recorded');
                const successAlert = createSuccessAlert('Your expense was successfully recorded');
                setShowAlert({alert: successAlert, show: true});
                (event.target as HTMLFormElement).reset();
            } // check the response code and alert if the response is not ok
        })
    }).catch(err => {
        console.error(err)
        //alert('There was an error recording your expense');
        const errorAlert = createErrorAlert('There was an error recording your expense ' + err);
        setShowAlert({alert: errorAlert, show: true});
    });
} // end of submitdata

function createUrlParams(form:
                             HTMLFormElement) {
    // get the form data
    const formData = new FormData(form);

    // create the urlParams
    const urlData = new URLSearchParams();
    for (const pair of formData) {
        console.log(pair[0], pair[1]);
        const pair1 = pair[1].toString();
        urlData.append(pair[0], pair1);
    }

    return urlData;
}
