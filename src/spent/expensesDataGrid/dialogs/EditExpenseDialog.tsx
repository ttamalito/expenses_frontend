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
import {EditRegular} from "@fluentui/react-icons";

export const EditExpenseDialog = () => {
    return (
        <Dialog>
            <DialogTrigger disableButtonEnhancement>
                <Tooltip content="Edit (Not supported yet)" relationship="label">
                    <Button aria-label="Edit" icon={<EditRegular />} />
                </Tooltip>
            </DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Edit Expense</DialogTitle>
                    <DialogContent>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                        exercitationem cumque repellendus eaque est dolor eius expedita
                        nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates
                        in natus iure cumque eaque?
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Close</Button>
                        </DialogTrigger>
                        <Button appearance="primary">Do Something</Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};