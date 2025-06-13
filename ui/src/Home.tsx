import React from 'react';
import HomeSideBar from './shared/HomeSideBar';
import Box from '@mui/material/Box';
import HomeTopBar from './shared/HomeTopBar';
import BaseRoutes from './routes/BaseRoutes';

export default function Home() {
  return (
    <>
      <HomeSideBar />
      <main className={'content'}>
        <Box
          component="main"
          className="MainContent"
          sx={{
            pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
            overflow: 'auto',
          }}
        >
          <HomeTopBar />
          <BaseRoutes />
        </Box>
      </main>
    </>
  );
}
