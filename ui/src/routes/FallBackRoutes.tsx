import React from "react";
import {Route, Routes} from "react-router-dom";
import Unauthorized from "../fallback/Unauthorized";
import InternalAPINotFound from "../fallback/InternalAPINotFound";
import InternalError from "../fallback/InternalError";
import {internalErrorRoute, notFoundRoute, unauthorizedRoute} from "./paths/fallbackRoutesPaths";


export default function FallBackRoutes() {

    return (<Routes>
        <Route path= {unauthorizedRoute} element={<Unauthorized />}/>
    </Routes>);
}