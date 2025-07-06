import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Grid,
  Paper,
  Text,
  Avatar,
  Group,
  TextInput,
  Button,
  NativeSelect,
  Box,
  FileInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IUpdateUserDto } from '@clients';
import { usePostUpdate, useGetUser } from '@requests/userRequests.ts';
import { useGetAllCurrencies } from '@requests/currencyRequests.ts';
import ExpenseCategoryTable from './ExpenseCategoryTable';
import IncomeCategoryTable from './IncomeCategoryTable';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [getUser] = useGetUser();
  const [updateUser] = usePostUpdate();
  const [getAllCurrencies] = useGetAllCurrencies();

  const form = useForm<IUpdateUserDto>({
    mode: 'uncontrolled',
  });

  const fetchUser = async () => {
    try {
      // Assuming we can get the current user's username from somewhere
      // This might need to be adjusted based on your authentication system
      const username = 'tamalito'; // TODO: CHange it later
      const response = await getUser(username);
      console.log(response);
      if (response?.data) {
        setUser(response.data);
        form.initialize({
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          currencyId: response.data.currencyId || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchCurrencies = async () => {
    try {
      const response = await getAllCurrencies();
      if (response?.data) {
        setCurrencies(response.data);
      }
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCurrencies();
  }, []);

  const handleUpdateProfile = async (values: IUpdateUserDto) => {
    try {
      const username = 'tamalito';
      await updateUser(username, values);
      fetchUser(); // Refresh user data
      notifications.show({
        title: 'Success',
        message: 'User data updated successfully',
        color: 'green',
      });
    } catch (error) {
      console.error('Error updating user:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to update user data',
        color: 'red',
      });
    }
  };

  const handleProfilePictureChange = (file: File | null) => {
    if (file) {
      setProfilePicture(file);
      // Here you would typically upload the file to your server
      // This would require an additional endpoint and hook
      console.log('Profile picture changed:', file);
    }
  };

  return (
    <Container fluid>
      <Title order={1} mb="xl">
        Profile
      </Title>

      {/* User Profile Box */}
      <Paper shadow="xs" p="md" mb="xl">
        <Grid>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar
                size={150}
                radius={75}
                src={
                  profilePicture
                    ? URL.createObjectURL(profilePicture)
                    : user?.profilePicture
                }
                mb="md"
              />
              <FileInput
                accept="image/*"
                placeholder="Change profile picture"
                onChange={handleProfilePictureChange}
              />
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 9 }}>
            <Box>
              <Text size="xl" fw={700} mb="xs">
                {user?.username}
              </Text>
              <Text c="dimmed" mb="md">
                {user?.email}
              </Text>

              <form onSubmit={form.onSubmit(handleUpdateProfile)}>
                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="First Name"
                      placeholder="Your first name"
                      {...form.getInputProps('firstName')}
                      mb="md"
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Last Name"
                      placeholder="Your last name"
                      {...form.getInputProps('lastName')}
                      mb="md"
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <NativeSelect
                      label="Currency"
                      //placeholder="Select currency"
                      data={currencies.map((currency) => {
                        return {
                          value: currency.id.toString(),
                          label: `${currency.name} (${currency.symbol})`,
                        };
                      })}
                      {...form.getInputProps('currencyId')}
                      mb="md"
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Group justify="flex-end">
                      <Button type="submit">Save Changes</Button>
                    </Group>
                  </Grid.Col>
                </Grid>
              </form>
            </Box>
          </Grid.Col>
        </Grid>
      </Paper>

      {/* Expense Categories Box */}
      <Paper shadow="xs" p="md" mb="xl">
        <Title order={2} mb="md">
          Expense Categories
        </Title>
        <ExpenseCategoryTable />
      </Paper>

      {/* Income Categories Box */}
      <Paper shadow="xs" p="md" mb="xl">
        <Title order={2} mb="md">
          Income Categories
        </Title>
        <IncomeCategoryTable />
      </Paper>
    </Container>
  );
}
