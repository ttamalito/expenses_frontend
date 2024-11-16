import Stack from '@mui/material/Stack';
import React from 'react';
import Paper from '@mui/material/Paper';
import styled from '@mui/material/styles/styled';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));
export default function HomeNavBar() {

    const expensesManagerLogo = <p>Expenses Manager</p>
    const modifyBudget = <a href={'/budget/setup'}>Modify your budget</a>
    const login = <a>Login</a>
    const signup = <a>Signup</a>

    const stack = <Stack direction="row" spacing={2}
                         sx={{
                             justifyContent: "center",
                             alignItems: "center",
                         }}
    >
        <Item>{expensesManagerLogo}</Item>
        <Item>{modifyBudget}</Item>
        <Item>{login}</Item>
        <Item>{signup}</Item>
    </Stack>;

    return (
        <div>
            {stack}
        </div>
    );
}