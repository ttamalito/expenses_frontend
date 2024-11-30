import {BrowserRouter} from "react-router-dom";
import BaseRoutes from "./routes/BaseRoutes";
import React from "react";
import FallBackRoutes from "./routes/FallBackRoutes";
import { theme } from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import HomeSideBar from "./shared/HomeSideBar";
import HomeTopBar from "./shared/HomeTopBar";
import './index.css';

function App() {
  // how to change the title of the webpage
  document.title = 'Expenses Manager';
  const responsiveMetaTag = document.createElement('meta');
    responsiveMetaTag.name = 'viewport';
    responsiveMetaTag.content = 'width=device-width, initial-scale=1';
    document.head.appendChild(responsiveMetaTag);

  return (
      <ThemeProvider theme={theme}>
          <CssBaseline/>
          <div className="app">
              <HomeSideBar />
              <main className={'content'}>
                  <HomeTopBar />
                      <BaseRoutes/>
                      <FallBackRoutes/>
                </main>
            </div>
      </ThemeProvider>
);
}
export default App;
