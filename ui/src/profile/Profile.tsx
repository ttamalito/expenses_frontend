import React, { useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import CategoryCard from './profileCards/CategoryCard';
import UserInformationCard from './profileCards/UserInformationCard';
import fetchUserData from './requests/fetchUserData';

interface IProfileProps {
  username: string;
}

export default function Profile({ username }: IProfileProps) {
  const [userData, setUserData] = React.useState<any>({
    id: 0,
    username: '',
    email: 'helloooooo',
    firstName: '',
    lastName: '',
    profilePicture: '',
    monthlyBudget: 0,
    currency: {
      id: 0,
      name: '',
      symbol: '',
      code: '',
      selected: false,
    },
  });
  useEffect(() => {
    fetchUserData(username)
      .then((data) => {
        console.log('Data: ', data);
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data: ', error);
      });
  }, [username]);

  return (
    <div>
      <Box sx={{ flex: 1, width: '100%' }}>
        <ProfileHeader username={username} />

        <Container>
          <Stack
            spacing={4}
            sx={{
              display: 'flex',
              maxWidth: '800px',
              mx: 'auto',
              px: { xs: 2, md: 6 },
              py: { xs: 2, md: 3 },
            }}
          >
            <UserInformationCard userData={userData} />

            <CategoryCard />
          </Stack>
        </Container>
      </Box>{' '}
      {/*This is the closing tag for the main box component  */}
    </div>
  );
}
