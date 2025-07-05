import { Routes, Route, Navigate } from 'react-router';
import React, { useEffect } from 'react';
import './index.css';
import Base from './Base.tsx';
import MonthExpenses from './spent/month/MonthExpenses.tsx';
import Budget from './budget/Budget.tsx';
import YearSummary from './spent/year/YearSummary.tsx';
import Profile from './profile/Profile.tsx';
import LandingPage from './landingPage/LandingPage.tsx';
import SignUp from './auth/SignUp.tsx';
import { AuthProvider } from './hooks/useAuth.tsx';
import Login from './pages/login/Login.tsx';
import { constants } from '@routes';
import ExpensesLayout from './pages/layout/ExpensesLayout.tsx';

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path={'/'} element={<LandingPage />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/signup'} element={<SignUp />} />
        <Route path={constants.content} element={<ExpensesLayout />}>
          <Route path={''} index element={<Base />} />
        </Route>

        <Route
          path={'/expensesMonth/:month/:year'}
          element={<MonthExpenses />}
        />
        <Route path={'/budget'} element={<Budget />} />
        <Route path={'/summary/:year'} element={<YearSummary />} />
        <Route path={'/profile'} element={<Profile username={'tamalito'} />} />
      </Routes>
    </AuthProvider>
  );
}
export default App;
