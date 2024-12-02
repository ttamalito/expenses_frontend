import {BrowserRouter} from "react-router-dom";
import BaseRoutes from "./routes/BaseRoutes";
import React, {useEffect} from "react";
import FallBackRoutes from "./routes/FallBackRoutes";
import { theme } from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import HomeSideBar from "./shared/HomeSideBar";
import HomeTopBar from "./shared/HomeTopBar";
import './index.css';
import Box from "@mui/material/Box";
import isLoggedInRequest from "./auth/requests/isLoggedInRequest";
import Home from "./Home";

function App() {

    const [loggedIn, setLoggedIn] = React.useState(false);

    useEffect(() => {
        isLoggedInRequest().then((response) => {
            if (response) {
                console.log('User is logged in, verifyied in App.tsx');
                setLoggedIn(true);
            } else {
                console.log('User is not logged in, verifyied in App.tsx');
                //window.location.href = '/login';
            } // end of if else
        }).catch((error) => {
            console.error(error);
            setLoggedIn(false);
        });
    }, []);

    const authorizedComponents = <>
        <HomeSideBar/>
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

                <HomeTopBar/>
                <BaseRoutes/>
            </Box>
        </main>
    </>

    const unauthorizedComponents = <FallBackRoutes/>


  // how to change the title of the webpage
  document.title = 'Expenses Manager';
  const responsiveMetaTag = document.createElement('meta');
    responsiveMetaTag.name = 'viewport';
    responsiveMetaTag.content = 'width=device-width, initial-scale=1';
    document.head.appendChild(responsiveMetaTag);

  return (

      <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Box sx={{display: 'flex', minHeight: '100dvh'}}>
              <div className="app">

                  {loggedIn ? <Home /> : unauthorizedComponents}
              </div>
          </Box>
      </ThemeProvider>

);
}
export default App;
