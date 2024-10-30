import React, {useState} from "react";
import Button from "@mui/material/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl'; // wrap each input within a FormControl, it is used to preserve state
import FormLabel from '@mui/material/FormLabel';
import ExpensesTypesTypesDeclarations from "../utils/expensesTypesTypesDeclarations";
import types from "../utils/types";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import ToolTip from "@mui/material/Tooltip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";



export default function AddExpenseForm() {

    let typeKey: keyof ExpensesTypesTypesDeclarations;
    const keysOfTypesOfTransactions: (keyof ExpensesTypesTypesDeclarations)[] = [];
    const typesOfTransactions = [];

    for (typeKey in types) {
        keysOfTypesOfTransactions.push(typeKey);
        typesOfTransactions.push(types[typeKey]);
    }

    const form = <form onSubmit={(event) => {
        //submitData(event, setShowAlert);
        //setFetchTotalSpentFlag(!fetchTotalSpentFlag);
        // create a timer for 3 seconds
        setTimeout(() => {
          //  setShowAlert({alert: <></>, show: false});
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
        <FormControl required={true} variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <ToolTip title="Select one of the transaction types of the list down below" placement="top">
                {/*<FormLabel id="typeOfTransaction">Type of Transaction</FormLabel>*/}
                <InputLabel id="typeOfTransaction">Type of Transaction</InputLabel>
            </ToolTip>
            <Select
                name={'type'}
                labelId="typeOfTransaction"
                id="select-transaction-type"
                //value={age}
                //onChange={handleChange}
                //label="Helloooooooooooooooooooooooooooooo"
                variant={"standard"}>
                {keysOfTypesOfTransactions.map((option) => (
                    <MenuItem key={option.valueOf()} value={types[option]}>
                        {option.valueOf()}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        <br/>
        <input type="text"
               placeholder={'notes'}
               name={'notes'}
               autoComplete={'off'}/>
        <br/>


        <Button type={'submit'} variant={'contained'} color="success">Add
            Expense</Button>

    </form>
}