import {BrowserRouter} from "react-router-dom";
import BaseRoutes from "./routes/BaseRoutes";



function App() {
  // how to change the title of the webpage
  document.title = 'Expenses Manager';

  return (
      <BrowserRouter>
        <BaseRoutes />
      </BrowserRouter>);
}
export default App;
