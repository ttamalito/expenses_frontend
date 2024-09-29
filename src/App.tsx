import {BrowserRouter} from "react-router-dom";
import BaseRoutes from "./routes/BaseRoutes";
import React from "react";
import FallBackRoutes from "./routes/FallBackRoutes";
import {fallbackRoute} from "./routes/paths/fallbackRoutesPaths";



function App() {
  // how to change the title of the webpage
  document.title = 'Expenses Manager';
  const responsiveMetaTag = document.createElement('meta');
    responsiveMetaTag.name = 'viewport';
    responsiveMetaTag.content = 'width=device-width, initial-scale=1';
    document.head.appendChild(responsiveMetaTag);

  return (
      <BrowserRouter>
        <BaseRoutes />
        <FallBackRoutes />
      </BrowserRouter>);
}
export default App;
