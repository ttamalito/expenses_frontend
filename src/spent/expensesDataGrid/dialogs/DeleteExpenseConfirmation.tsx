import * as React from "react";
import {
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogBody,
    DialogActions,
    DialogContent,
    Button, Tooltip,
} from "@fluentui/react-components";
import {DeleteRegular, EditRegular} from "@fluentui/react-icons";

export const DeleteExpenseConfirmation = () => {
    return (
        <Dialog>
            <DialogTrigger disableButtonEnhancement>
                <Tooltip content="Delete (Not supported yet)" relationship="label">
                    <Button aria-label="Delete" icon={<DeleteRegular />} />
                </Tooltip>
            </DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Delete Expense (Not supported yet)</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this expense?
                        This action cannot be undone.
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Close</Button>
                        </DialogTrigger>
                        <Button appearance="primary" icon={<DeleteRegular />} >Delete</Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};