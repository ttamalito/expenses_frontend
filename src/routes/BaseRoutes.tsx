import React from "react";
import {Route, Routes} from "react-router-dom";
import Base from "../Base";
import MonthExpenses from "../MonthExpenses";
import SetUp from "../SetUp";
import YearSummary from "../spent/YearSummary";

export default function BaseRoutes() {

    return (<Routes>
        <Route path='/' element={<Base />}/>
        <Route path={'/expensesMonth/:month/:year'} element={<MonthExpenses />} />
        <Route path={'/setUp'} element={<SetUp />} />
        <Route path={'/summary/:year'} element={<YearSummary />} />
    </Routes>);
}