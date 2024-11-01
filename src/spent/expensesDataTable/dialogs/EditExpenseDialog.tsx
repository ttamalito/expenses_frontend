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
import OneExpenseSummaryTypeDeclaration from "../../../expensesComponents/utils/types/OneExpenseSummaryType";
import EditExpenseForm from "../forms/EditExpenseForm";
import AddOrEditExpenseForm from "../../../expensesComponents/AddOrEditExpenseForm";
import {modifyOneExpensePath} from "../../../expensesComponents/requests/paths";
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
    expense?: OneExpenseSummaryTypeDeclaration;
    handleOnEdit(expense: OneExpenseSummaryTypeDeclaration): void;
}

export default function EditExpenseDialog({open, setOpen, expense, handleOnEdit}: IEditExpenseDialogProps) {

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
                    onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                        const response = await modifyExpense(event, expense?._id);
                        const data = await response.json();
                        if (response.ok) {
                            handleOnEdit(data.expense);
                            setShowAlert({alert: createSuccessAlert('Expense modified successfully'), show: true});
                        } else {
                            setShowAlert({alert: createErrorAlert(data.message), show: true});
                        }
                        setTimeout(() => {
                            setShowAlert(defaultShowAlertWrapper);
                            handleClose();
                        }, 1000);
                    },
                }}
            >
                {showAlert.show && showAlert.alert}
                <DialogTitle>Edit Expense</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit the expense details
                    </DialogContentText>
                    {/*<TextField*/}
                    {/*    autoFocus*/}
                    {/*    required*/}
                    {/*    margin="dense"*/}
                    {/*    id="name"*/}
                    {/*    name="email"*/}
                    {/*    label="Email Address"*/}
                    {/*    type="email"*/}
                    {/*    fullWidth*/}
                    {/*    variant="standard"*/}
                    {/*/>*/}

                     <AddOrEditExpenseForm expense={expense} edit={true} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Edit Expense</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

function modifyExpense(event: React.FormEvent<HTMLFormElement>, id?: string) : Promise<Response> {
    event.preventDefault();
    //console.log('modifying expense');
    const formData = new FormData(event.currentTarget);

    // create the urlParams
    const urlData = new URLSearchParams();
    for (const pair of formData) {
        // console.log(pair[0], pair[1]);
        urlData.append(pair[0], pair[1].toString());
    }

    const url = modifyOneExpensePath(id as string);

    return fetch(url, {
        method: 'POST',
        redirect: 'follow',
        body: urlData,
        credentials: 'include'
    });
}
