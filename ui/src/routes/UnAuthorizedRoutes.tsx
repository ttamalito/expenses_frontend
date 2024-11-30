import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import LandingPage from "../landingPage/LandingPage";

export default function UnAuthorizedRoutes() {

    return (<Routes>
        <Route path={'/'} element={<LandingPage />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/signup'} element={<SignUp />} />
    </Routes>);
}