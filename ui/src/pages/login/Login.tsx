import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  LoadingOverlay,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import classes from './Login.module.css';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth.tsx';
import { useForm } from '@mantine/form';
import { IUserLoginRequest } from '@clients';
import { useDisclosure } from '@mantine/hooks';
import { routes } from '@routes';

/**
 * Login page to be used in home/login
 * Handles the login process and redirects to the content page
 * @constructor
 */
function Login() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { onLogin } = useAuth();
  const [visible, { open, close }] = useDisclosure(false);
  const formHook = useForm<IUserLoginRequest>({
    name: 'loginForm',
    mode: 'uncontrolled',
    validate: {
      // userName: (value) => {
      //   if (!value) {
      //     return 'loginPage.userNameError';
      //   }
      //   return value.trim().length < 1 ? 'loginPage.userNameError' : null;
      // },
      // password: (value) => {
      //   if (!value) {
      //     return 'loginPage.passwordLengthError';
      //   }
      //   return value.trim().length < 1 ? 'loginPage.passwordLengthError' : null;
      // },
    },
    // transformValues: (values) => {
    //   const loginViewModel: ILoginViewModel = {
    //     userName: values.userName!,
    //     password: values.password!,
    //     rememberMe: values.rememberMe,
    //   };
    //   return loginViewModel;
    // },
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        {'loginPage.login'}
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        {'loginPage.noAccountYet'}{' '}
        <Anchor
          onClick={() => {
            navigate(routes.home.register);
          }}
          size="sm"
          component="button"
        >
          {'loginPage.register'}
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: theme.other.yoloPurple }}
        />
        <form
          onSubmit={formHook.onSubmit((values) => {
            console.log('Clicked');
            open(); // Show loading overlay
            onLogin(values)
              .then((response) => {
                //formHook.reset();
                close(); // Hide loading overlay
                if (response) {
                  navigate(response);
                }
              })
              .catch((error: string) => {
                close(); // Hide loading overlay
                if (error.includes('ñ')) {
                  formHook.setFieldError('password', error);
                } else {
                  formHook.setFieldError('userName', error);
                }
              });
          })}
        >
          <TextInput
            label={'loginPage.userOrEmail'}
            placeholder={'loginPage.userOrEmail'}
            required
            key={formHook.key('email')}
            {...formHook.getInputProps('email')}
          />
          <PasswordInput
            label={'loginPage.password'}
            placeholder={'loginPage.password'}
            required
            mt="md"
            key={formHook.key('password')}
            {...formHook.getInputProps('password')}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox
              label={'loginPage.rememberMe'}
              key={formHook.key('rememberMe')}
              {...formHook.getInputProps('rememberMe', { type: 'checkbox' })}
            />
            <Anchor
              component={'a'}
              size="sm"
              onClick={(event) => {
                event.preventDefault();
                //navigate(routes.home.forgotPassword);
              }}
            >
              {'loginPage.forgotPassword'}
            </Anchor>
          </Group>
          <Button
            fullWidth
            mt="xl"
            type={'submit'}
            leftSection={<IconArrowRight />}
          >
            {'loginPage.login'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
