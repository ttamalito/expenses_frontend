import { Stack, Paper, Box, ActionIcon, TextInput, Tooltip, Group, createStyles } from '@mantine/core';
import React from 'react';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';

// Custom styled Paper component
const Item = ({ children }: { children: React.ReactNode }) => (
  <Paper p="sm" style={{ textAlign: 'center', backgroundColor: '#fff' }}>
    {children}
  </Paper>
);
export default function HomeTopBar() {

  const expensesManagerLogo = <p>Expenses Manager</p>;
  const modifyBudget = <a href={'/budget/setup'}>Modify your budget</a>;
  const login = <a>Login</a>;
  const signup = <a>Signup</a>;

  const stack = (
    <Group position="center" spacing="md">
      <Item>{expensesManagerLogo}</Item>
      <Item>{modifyBudget}</Item>
      <Item>{login}</Item>
      <Item>{signup}</Item>
    </Group>
  );

  return (
    <Box style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem' }}>
      {/* SEARCH BAR */}
      <Box style={{ display: 'flex', borderRadius: '3px' }}>
        <TextInput style={{ marginLeft: '0.5rem', flex: 1 }} placeholder="Search..." />
      </Box>
      <ActionIcon>
        <SearchIcon />
      </ActionIcon>

      {/* ICONS */}
      <Group>
        <Tooltip label="Notifications">
          <ActionIcon>
            <NotificationsOutlinedIcon />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Profile">
          <ActionIcon>
            <PersonOutlinedIcon />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Light Mode (NOT SUPPORTED)">
          <ActionIcon>
            <LightModeOutlinedIcon />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Settings">
          <ActionIcon>
            <SettingsOutlinedIcon />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Box>
  );
}
