import * as React from 'react';
import {
  Box,
  Button,
  Divider,
  Text,
  Title,
  Stack,
  Paper,
  TextInput,
  Anchor,
} from '@mantine/core';
// import AppTheme from '../shared-theme/AppTheme';
// import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
// import ColorModeSelect from '../shared-theme/ColorModeSelect'; // TODO: revise AppTheme
import signUpRequest from './requests/signUpRequest';

// Custom styled components using Mantine
const cardStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: '2rem',
  gap: '1rem',
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  '@media (min-width: 576px)': {
    width: '450px',
  }
};

const signUpContainerStyles = {
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: '1rem',
  '@media (min-width: 576px)': {
    padding: '2rem',
  },
  position: 'relative',
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
  }
};

export default function SignUp(props: { disableCustomTheme?: boolean }) {

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const name = document.getElementById('username') as HTMLInputElement;
    const confirmPassword = document.getElementById(
      'confirmPassword',
    ) as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!confirmPassword.value || confirmPassword.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (password.value !== confirmPassword.value) {
      setPasswordError(true);
      setPasswordErrorMessage('Passwords do not match.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    // check if name has whitespace
    if (name.value.includes(' ')) {
      setNameError(true);
      setNameErrorMessage('Name cannot contain whitespace.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (nameError || emailError || passwordError) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    try {
      signUpRequest(event.currentTarget);
    } catch (error) {
      console.error('Probably a bad request', error);
    }
  };

  return (
    <>
      <Stack style={signUpContainerStyles} justify="space-between">
        <Paper withBorder p="md" radius="md" style={cardStyles}>
          <Title order={1} style={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
            Sign up
          </Title>
          <Box
            component="form"
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <Stack gap="xs">
              <Text component="label" htmlFor="username">User name</Text>
              <TextInput
                autoComplete="name"
                name="username"
                required
                id="username"
                placeholder="someUsername"
                error={nameError ? nameErrorMessage : false}
              />
            </Stack>
            <Stack gap="xs">
              <Text component="label" htmlFor="email">Email</Text>
              <TextInput
                required
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                error={emailError ? emailErrorMessage : false}
              />
            </Stack>
            <Stack gap="xs">
              <Text component="label" htmlFor="password">Password</Text>
              <TextInput
                required
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                error={passwordError ? passwordErrorMessage : false}
              />
            </Stack>
            <Stack gap="xs">
              <Text component="label" htmlFor="confirmPassword">Confirm Password</Text>
              <TextInput
                required
                name="confirmPassword"
                placeholder="••••••"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                error={passwordError ? passwordErrorMessage : false}
              />
            </Stack>
            <Button
              type="submit"
              fullWidth
              onClick={validateInputs}
            >
              Sign up
            </Button>
          </Box>
          <Divider label="or" labelPosition="center" my="md" />
          <Box style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Button
              fullWidth
              variant="outline"
              onClick={() => {
                return alert('Sign up with Facebook');
              }}
            >
              Sign up with Facebook
            </Button>
            <Text align="center">
              Already have an account?{' '}
              <Anchor
                href="/material-ui/getting-started/templates/sign-in/"
                style={{ alignSelf: 'center' }}
              >
                Log in
              </Anchor>
            </Text>
          </Box>
        </Paper>
      </Stack>
    </>
  );
}
