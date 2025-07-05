import React from 'react';
import {
  Paper,
  Box,
  Text,
  Title,
  Divider,
  Stack,
  Group,
  Avatar,
  ActionIcon,
  TextInput,
  Button,
} from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import SelectCurrencyComponent from './components/SelectCurrencyComponent';

// Custom styled component for online status badge
const OnlineStatusBadge = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box pos="relative">
      {children}
      <Box
        pos="absolute"
        bottom={5}
        right={5}
        w={16}
        h={16}
        bg="#44b700"
        style={{
          borderRadius: '50%',
          border: '2px solid white',
        }}
        className="pulse-animation"
        sx={{
          '@keyframes pulse': {
            '0%': { transform: 'scale(0.8)', opacity: 1 },
            '100%': { transform: 'scale(2.4)', opacity: 0 },
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'pulse 1.2s infinite ease-in-out',
            border: '1px solid #44b700',
          },
        }}
      />
    </Box>
  );
};

interface IUserInformationCardProps {
  userData: User;
}

export default function UserInformationCard({
  userData,
}: IUserInformationCardProps) {
  const [emailValue, setEmailValue] = React.useState(userData.email);

  console.log('Received in user information card: ', userData);

  return (
    <Paper withBorder p="md" radius="md">
      <Box mb="xs">
        <Title order={3}>User Information</Title>
        <Text size="sm">Edit your personal information</Text>
      </Box>
      <Divider />
      <Stack
        direction="row"
        gap="md"
        style={{ display: 'flex', marginBlock: '0.5rem' }}
        visibleFrom="md"
      >
        <Stack gap="xs">
          {/* PROFILE PICTURE*/}
          <OnlineStatusBadge>
            <Avatar size={105} alt="Logo" src="/tamalito.jpg" />
          </OnlineStatusBadge>
          <ActionIcon
            aria-label="upload new picture"
            size="sm"
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              zIndex: 2,
              borderRadius: '50%',
              left: 100,
              top: 170,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <IconEdit size={16} />
          </ActionIcon>
        </Stack>
        {/* PROFILE PICTURE (STACK) END*/}
        <Stack gap="md" style={{ flexGrow: 1 }}>
          <Stack gap="xs">
            <Text>Name</Text>
            <Group grow>
              <TextInput
                size="sm"
                placeholder="First name"
                defaultValue={userData.firstName}
              />
              <TextInput
                size="sm"
                placeholder="Last name"
                style={{ flexGrow: 1 }}
              />
            </Group>
          </Stack>
          {/* NAME (STACK) END*/}
          <Group grow>
            <Stack gap="xs">
              <Text>Role</Text>
              <TextInput size="sm" defaultValue="UI Developer" />
            </Stack>
            <Stack gap="xs" style={{ flexGrow: 1 }}>
              <Text>Email</Text>
              <TextInput
                size="sm"
                type="email"
                placeholder="email"
                defaultValue={`${userData.email}`}
                value={emailValue}
                onChange={(event) => {
                  return setEmailValue(event.target.value);
                }}
                style={{ flexGrow: 1 }}
              />
            </Stack>
          </Group>
          {/* ROLE AND EMAIL (STACK) END*/}
          <Group grow>
            <SelectCurrencyComponent selectedCurrency={userData.currency} />
          </Group>
          {/* Select currency for transactions */}
        </Stack>
        {/* END OF STACK AFTER PROFILE PICTURE*/}
      </Stack>
      <Divider /> {/* Buttons to save the changes */}
      <Group justify="flex-end" mt="md">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </Group>
    </Paper>
  );
}
