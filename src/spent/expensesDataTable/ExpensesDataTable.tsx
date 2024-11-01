import * as React from 'react';
import {useEffect} from 'react';
import {alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import {visuallyHidden} from '@mui/utils';
import OneExpenseSummaryTypeDeclaration from "../../expensesComponents/utils/types/OneExpenseSummaryType";
import EditExpenseDialog from "./dialogs/EditExpenseDialog"
import DeleteExpenseConfirmationDialog from "./dialogs/DeleteExpenseConfirmationDialog";


/**
 * Actual comparator for the expenses
 * @param a
 * @param b
 * @param orderBy
 */
function descendingComparator(a: OneExpenseSummaryTypeDeclaration, b: OneExpenseSummaryTypeDeclaration, orderBy: keyof OneExpenseSummaryTypeDeclaration) {

    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;

}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof OneExpenseSummaryTypeDeclaration>(
    order: Order,
    orderBy: Key,
): (
    a: OneExpenseSummaryTypeDeclaration,
    b: OneExpenseSummaryTypeDeclaration,
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof OneExpenseSummaryTypeDeclaration;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'notes',
        numeric: false,
        disablePadding: true,
        label: 'Description',
    },
    {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'Amount',
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'Type',
    },
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'Date',
    }
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof OneExpenseSummaryTypeDeclaration) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} =
        props;
    const createSortHandler =
        (property: keyof OneExpenseSummaryTypeDeclaration) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all expenses',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell align={"right"}>Actions</TableCell>
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const {numSelected} = props;
    return (
        <Toolbar
            sx={[
                {
                    pl: {sm: 2},
                    pr: {xs: 1, sm: 1},
                },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Expenses
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

interface IExpenses {
    expenses: OneExpenseSummaryTypeDeclaration[];
    // fetchExpenses: undefined | ((month: string, year: string, setExpenses: {
    //     (value:
    //          (((prevState: OneExpenseSummaryTypeDeclaration[]) => OneExpenseSummaryTypeDeclaration[]) | OneExpenseSummaryTypeDeclaration[])): void
    // })
    //     => void);
    // month: string | undefined;
    // year: string | undefined;
}

export default function ExpensesDataTable({expenses}: IExpenses) {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof OneExpenseSummaryTypeDeclaration>('amount');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openDeleteExpenseConfirmationDialog, setOpenDeleteExpenseConfirmationDialog] = React.useState(false);
    const [expenseToEdit, setExpenseToEdit] = React.useState<OneExpenseSummaryTypeDeclaration | undefined>(undefined);
    const [expensesFetched, setExpensesFetched] = React.useState<OneExpenseSummaryTypeDeclaration[]>([]);

    // useEffect(() => {
    //     if (fetchExpenses) {
    //         fetchExpenses(month!, year!, setExpensesFetched);
    //     }
    // }, [fetchExpenses, month, year]);

    const handleClickOpenEditDialog = (expense: OneExpenseSummaryTypeDeclaration) => {
        setOpenEditDialog(true);
        setExpenseToEdit(expense);
    };

    const handleClickOpenDeleteExpenseConfirmationDialog = (expense: OneExpenseSummaryTypeDeclaration) => {
        setOpenDeleteExpenseConfirmationDialog(true);
        setExpenseToEdit(expense);
    };

    const rows = expenses;

    /**
     * Used when clicking on the arrow of the column to sort the expenses
     * It only sets the order (ascending | descending) and orderBy
     * @param event
     * @param property
     */
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof OneExpenseSummaryTypeDeclaration,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        console.log('isAsc: ', isAsc);
        console.log('orderBy: ', orderBy);
        console.log('property: ', property);
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            [...rows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, rows],
    );

    return (
        <>
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2}}>
                    <EnhancedTableToolbar numSelected={selected.length}/>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const isItemSelected = selected.includes(row._id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            // onClick={(event) => handleClick(event, row._id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row._id}
                                            selected={isItemSelected}
                                            sx={{cursor: 'pointer'}}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.notes}
                                            </TableCell>
                                            <TableCell align="right">{row.amount}</TableCell>
                                            <TableCell align="right">{row.type}</TableCell>
                                            <TableCell align="right">{row.date}</TableCell>
                                            {/*<TableCell align="right">{row.notes}</TableCell>*/}
                                            <TableCell align={"right"}>
                                                {/*<IconButton aria-label={"edit"}>*/}
                                                {/*    <EditIcon />*/}
                                                {/*</IconButton>*/}
                                                {/*<IconButton aria-label={"delete"}>*/}
                                                {/*    <DeleteIcon />*/}
                                                {/*</IconButton>*/}
                                                <Tooltip title="Edit">
                                                    <IconButton aria-label={"edit"} size={"small"}
                                                                onClick={() => {
                                                                    handleClickOpenEditDialog({...row});
                                                                }}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                                {/*<Divider orientation="vertical" />*/}
                                                <Tooltip title={"Delete"}>
                                                    <IconButton aria-label={"delete"} size={"small"}
                                                                onClick={() => {
                                                                    handleClickOpenDeleteExpenseConfirmationDialog({...row});
                                                                }}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
            <EditExpenseDialog open={openEditDialog} setOpen={setOpenEditDialog} expense={expenseToEdit}/>
            <DeleteExpenseConfirmationDialog open={openDeleteExpenseConfirmationDialog}
                                             setOpen={setOpenDeleteExpenseConfirmationDialog}
                                             expenseId={expenseToEdit?._id}/>
        </>

    );
}