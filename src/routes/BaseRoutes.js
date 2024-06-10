import React from "react";
import {Route, Routes} from "react-router-dom";
import Base from "../Base";
import MonthExpenses from "../MonthExpenses";
import SetUp from "../SetUp";

export default function BaseRoutes() {

    return (<Routes>
        <Route exact path='/' element={<Base />}/>
        <Route exact path={'/expensesMonth/:month/:year'} element={<MonthExpenses />} />
        <Route exact path={'/setUp'} element={<SetUp />} />
    </Routes>);
}