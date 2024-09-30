import React from "react";
import Alert, {AlertColor, AlertPropsColorOverrides} from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

/**
 * This interface is used to show an alert.
 * This should be used when the backend does not return data
 */
export interface IShowAlertWrapper {
    show: boolean;
    alert: JSX.Element;
}

export const defaultShowAlertWrapper: IShowAlertWrapper = {show: false, alert: <></>};

export const createSuccessAlert = (message: string) => {
    return <Alert severity={"success"} icon={<CheckIcon fontSize={'inherit'}/>}>{message}</Alert>
}

export const createErrorAlert = (message: string) => {
    return <Alert severity={"error"}>{message}</Alert>
}

export const createWarningAlert = (message: string) => {
    return <Alert severity={"warning"}>{message}</Alert>
}

export const createInfoAlert = (message: string) => {
    return <Alert severity={"info"}>{message}</Alert>
}