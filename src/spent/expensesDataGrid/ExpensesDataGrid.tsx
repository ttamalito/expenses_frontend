import * as React from "react";
import {
    FolderRegular,
    EditRegular,
    OpenRegular,
    DocumentRegular,
    DocumentPdfRegular,
    VideoRegular,
    CalendarDateRegular,
    DeleteRegular, PeopleRegular,
} from "@fluentui/react-icons";
import {
    PresenceBadgeStatus,
    Avatar,
    DataGridBody,
    DataGridRow,
    DataGrid,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridCell,
    TableCellLayout,
    TableColumnDefinition,
    createTableColumn,
    Button,
    TableColumnId,
    DataGridCellFocusMode, Tooltip,
} from "@fluentui/react-components";
import {IExpenseItem, IAmount, ITypeCell, IDateCell, LastUpdatedCell} from "./types";
import OneExpenseSummaryTypeDeclaration from "../../expensesComponents/utils/types/OneExpenseSummaryType";
import {createExpensesForDataGrid} from "./createExpensesForDataGrid";
import {EditExpenseDialog} from "./dialogs/EditExpenseDialog";
import {DeleteExpenseConfirmation} from "./dialogs/DeleteExpenseConfirmation";


const columns: TableColumnDefinition<IExpenseItem>[] = [
    createTableColumn<IExpenseItem>({
        columnId: "amount",
        compare: (a, b) => {
            if (a.amount.label < b.amount.label) {
                return -1;
            }
            return 1;
        },
        renderHeaderCell: () => {
            return "Amount";
        },
        renderCell: (item) => {
            return (
                <TableCellLayout media={item.amount.icon}>
                    {item.amount.label}
                </TableCellLayout>
            );
        },
    }),
    createTableColumn<IExpenseItem>({
        columnId: "type",
        compare: (a, b) => {
            return a.type.label.localeCompare(b.type.label);
        },
        renderHeaderCell: () => {
            return "Type";
        },
        renderCell: (item) => {
            return (
                <TableCellLayout
                    media={item.type.icon}
                >
                    {item.type.label}
                </TableCellLayout>
            );
        },
    }),
    createTableColumn<IExpenseItem>({
        columnId: "date",
        compare: (a, b) => {
            return a.date.label.localeCompare(b.date.label);
        },
        renderHeaderCell: () => {
            return "Date";
        },
        renderCell: (item) => {
            return (
                <TableCellLayout
                    media={item.date.icon}
                >
                    {item.date.label}
                </TableCellLayout>
            );
        },
    }),
    createTableColumn<IExpenseItem>({
        columnId: "notes",
        compare: (a, b) => {
            if (a.notes.label < b.notes.label) {
                return -1;
            }
            return 1;
        },
        renderHeaderCell: () => {
            return "Notes";
        },
        renderCell: (item) => {
            return (
                <TableCellLayout media={item.notes.icon}>
                    {item.notes.label}
                </TableCellLayout>
            );
        },
    }),

    createTableColumn<IExpenseItem>({
        columnId: "singleAction",
        renderHeaderCell: () => {
            return "Single action";
        },
        renderCell: () => {
            return <Button icon={<OpenRegular />}>Open</Button>;
        },
    }),
    createTableColumn<IExpenseItem>({
        columnId: "actions",
        renderHeaderCell: () => {
            return "Actions";
        },
        renderCell: () => {
            return (
                <>
                    <EditExpenseDialog />
                    <DeleteExpenseConfirmation />
                </>
            );
        },
    }),
];

const getCellFocusMode = (columnId: TableColumnId): DataGridCellFocusMode => {
    switch (columnId) {
        case "singleAction":
            return "none";
        case "actions":
            return "group";
        default:
            return "cell";
    }
};

interface IExpenses {
    expenses: OneExpenseSummaryTypeDeclaration[];
}

export const ExpensesDataGrid = ({expenses} : IExpenses) => {
    const items = createExpensesForDataGrid(expenses);
    return (
        <DataGrid
            items={items}
            columns={columns}
            sortable
            selectionMode="multiselect"
            getRowId={(item) => item.amount.label}
            //onSelectionChange={(e, data) => console.log(data)}
            style={{ minWidth: "550px" }}
        >
            <DataGridHeader>
                <DataGridRow
                    selectionCell={{
                        checkboxIndicator: { "aria-label": "Select all rows" },
                    }}
                >
                    {({ renderHeaderCell }) => (
                        <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                    )}
                </DataGridRow>
            </DataGridHeader>
            <DataGridBody<IExpenseItem>>
                {({ item, rowId }) => (
                    <DataGridRow<IExpenseItem>
                        key={rowId}
                        selectionCell={{
                            checkboxIndicator: { "aria-label": "Select row" },
                        }}
                    >
                        {({ renderCell, columnId }) => (
                            <DataGridCell >
                                {renderCell(item)}
                            </DataGridCell>
                        )}
                    </DataGridRow>
                )}
            </DataGridBody>
        </DataGrid>
    );
};