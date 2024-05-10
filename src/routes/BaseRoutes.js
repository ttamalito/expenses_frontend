import React from "react";
import {Route, Routes} from "react-router-dom";
import Base from "../Base";
import MonthExpenses from "../MonthExpenses";

export default function BaseRoutes() {

    return (<Routes>
        <Route exact path='/' element={<Base />}/>
        <Route exact path={'/expensesMonth/:month/:year'} element={<MonthExpenses />} />

    </Routes>);
}