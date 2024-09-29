import React from "react";
import {Route, Routes} from "react-router-dom";
import Base from "../Base";
import MonthExpenses from "../spent/month/MonthExpenses";
import SetUp from "../budget/SetUp";
import YearSummary from "../spent/year/YearSummary";

export default function BaseRoutes() {

    return (<Routes>
        <Route path='/' element={<Base />}/>
        <Route path={'/expensesMonth/:month/:year'} element={<MonthExpenses />} />
        <Route path={'/budget/setup'} element={<SetUp />} />
        <Route path={'/summary/:year'} element={<YearSummary />} />
    </Routes>);
}