import { Routes, Route } from 'react-router';
import './index.css';
import { AuthProvider } from './hooks/useAuth.tsx';
import Login from './pages/login/Login.tsx';
import { constants } from '@routes';
import ExpensesLayout from './pages/layout/ExpensesLayout.tsx';
import Home from './pages/content/home/Home.tsx';
import Profile from './pages/content/profile/Profile.tsx';
import ExpensesLandingPage from './pages/landingPage/ExpensesLandingPage.tsx';
import Signup from './pages/register/Signup.tsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={'/'} element={<ExpensesLandingPage />} />
        <Route path={constants.Login} element={<Login />} />
        <Route path={constants.Register} element={<Signup />} />
        <Route path={constants.Content} element={<ExpensesLayout />}>
          <Route path={constants.Home} index element={<Home />} />
          <Route path={constants.Profile} element={<Profile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
export default App;
