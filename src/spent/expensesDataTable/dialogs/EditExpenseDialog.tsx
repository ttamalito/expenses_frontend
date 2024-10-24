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
}

export default function EditExpenseDialog({open, setOpen, expense}: IEditExpenseDialogProps) {

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
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
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

                     <EditExpenseForm expense={expense} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Edit Expense</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
