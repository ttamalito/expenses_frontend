import {BrowserRouter} from "react-router-dom";
import BaseRoutes from "./routes/BaseRoutes";
import React from "react";
import FallBackRoutes from "./routes/FallBackRoutes";
import { theme } from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

function App() {
  // how to change the title of the webpage
  document.title = 'Expenses Manager';
  const responsiveMetaTag = document.createElement('meta');
    responsiveMetaTag.name = 'viewport';
    responsiveMetaTag.content = 'width=device-width, initial-scale=1';
    document.head.appendChild(responsiveMetaTag);

  return (
      // <ThemeProvider theme={theme}>
      //     <CssBaseline/>
          <BrowserRouter>
              <BaseRoutes/>
              <FallBackRoutes/>
          </BrowserRouter>
      // </ThemeProvider>
          );
}
export default App;
