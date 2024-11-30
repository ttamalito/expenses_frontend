import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Typography from "@mui/material/Typography";
import deleteExpense from "../../requests/deleteExpense";
import {
    createErrorAlert,
    createSuccessAlert,
    defaultShowAlertWrapper,
    IShowAlertWrapper
} from "../../../wrappers/IShowAlertWrapper";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface IEditExpenseDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    expenseId?: string;
    handleOnDelete: (deletedId: string) => void;
}

export default function DeleteExpenseConfirmationDialog({open, setOpen, expenseId, handleOnDelete}: IEditExpenseDialogProps) {

    const [showAlert, setShowAlert] = React.useState<IShowAlertWrapper>(defaultShowAlertWrapper);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        submitRequestToDeleteExpense(expenseId as string, handleOnDelete).then(
                            (someAlert) => {
                                setShowAlert({alert: someAlert, show: true});
                                //alert('Expense deleted successfully');
                            }).catch((error) => {
                                console.error(error);
                                setShowAlert({alert: createErrorAlert('Major Error, please contanct and administrator'), show: true});
                        });
                        setTimeout(() => {
                            handleClose();
                            setShowAlert(defaultShowAlertWrapper);
                        }, 1000);
                    },
                }}
            >

                {showAlert.show && showAlert.alert}
                <DialogTitle>Delete Expense</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this expense?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Delete</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

async function submitRequestToDeleteExpense(expenseId: string, handleOnDelete: (deletedId: string) => void) {
    const status = await deleteExpense(expenseId);

    if (status === 204 || status === 200) {
        handleOnDelete(expenseId);
        return createSuccessAlert('Expense deleted successfully');
    } else {
        return createErrorAlert('There was an error deleting the expense');
    }
}
