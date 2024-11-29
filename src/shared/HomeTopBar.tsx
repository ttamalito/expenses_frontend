import Stack from '@mui/material/Stack';
import React from 'react';
import Paper from '@mui/material/Paper';
import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import {InputBase} from "@mui/material";



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
export default function HomeTopBar() {

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
        <Box display={'flex'} justifyContent={'space-between'} p={2}>
            {/* SEARCH BAR */}
            <Box display={'flex'} borderRadius={'3px'}>

                <InputBase sx={{ml: 2, flex: 1}} placeholder={'Search...'}/>

            </Box>
            <IconButton type={'button'} sx={{p: 1}}>
                <SearchIcon/>
            </IconButton>

            {/* ICONS */}
            <Box display={'flex'}>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <LightModeOutlinedIcon/>
                </IconButton>
            </Box>

        </Box>
    );
}