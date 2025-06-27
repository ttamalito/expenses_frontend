import { Routes, Route, Navigate } from 'react-router';
import BaseRoutes from './routes/BaseRoutes';
import React, { useEffect } from 'react';
import FallBackRoutes from './routes/FallBackRoutes';
import HomeSideBar from './shared/HomeSideBar';
import HomeTopBar from './shared/HomeTopBar';
import './index.css';
import Box from '@mui/material/Box';
import isLoggedInRequest from './auth/requests/isLoggedInRequest';
import Base from './Base.tsx';
import MonthExpenses from './spent/month/MonthExpenses.tsx';
import Budget from './budget/Budget.tsx';
import YearSummary from './spent/year/YearSummary.tsx';
import Profile from './profile/Profile.tsx';
import LandingPage from './landingPage/LandingPage.tsx';
import Login from './auth/Login.tsx';
import SignUp from './auth/SignUp.tsx';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  useEffect(() => {
    isLoggedInRequest()
      .then((response) => {
        if (response) {
          console.log('User is logged in, verifyied in App.tsx');
          setLoggedIn(true);
        } else {
          console.log('User is not logged in, verifyied in App.tsx');
          //window.location.href = '/login';
        } // end of if else
      })
      .catch((error) => {
        console.error(error);
        setLoggedIn(false);
      });
  }, []);

  const authorizedComponents = (
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

  const unauthorizedComponents = <FallBackRoutes />;

  // how to change the title of the webpage
  document.title = 'Expenses Manager';
  const responsiveMetaTag = document.createElement('meta');
  responsiveMetaTag.name = 'viewport';
  responsiveMetaTag.content = 'width=device-width, initial-scale=1';
  document.head.appendChild(responsiveMetaTag);
  /*
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <div className="app">
          {loggedIn ? <Home /> : unauthorizedComponents}
        </div>
      </Box>
    </ThemeProvider>
   */

  return (
    <Routes>
      <Route path={'/'} element={<LandingPage />} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/signup'} element={<SignUp />} />
      <Route path="/home" element={<Base />} />
      <Route path={'/expensesMonth/:month/:year'} element={<MonthExpenses />} />
      <Route path={'/budget'} element={<Budget />} />
      <Route path={'/summary/:year'} element={<YearSummary />} />
      <Route path={'/profile'} element={<Profile username={'tamalito'} />} />
    </Routes>
  );
}
export default App;
