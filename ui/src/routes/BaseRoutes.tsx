import { Route, Routes } from 'react-router';
import Base from '../Base';
import MonthExpenses from '../spent/month/MonthExpenses';
import Budget from '../budget/Budget';
import YearSummary from '../spent/year/YearSummary';
import Profile from '../profile/Profile';

export default function BaseRoutes() {
  return (
    <Routes>
      {/*<Route path={'/'} element={<LandingPage />} />*/}
      {/*<Route path={'/login'} element={<Login />} />*/}
      {/*<Route path={'/signup'} element={<SignUp />} />*/}
      {/*<Route element={<ProtectedRoutes />} >*/}
      <Route path="/home" element={<Base />} />
      <Route path={'/expensesMonth/:month/:year'} element={<MonthExpenses />} />
      <Route path={'/budget'} element={<Budget />} />
      <Route path={'/summary/:year'} element={<YearSummary />} />
      <Route path={'/profile'} element={<Profile username={'tamalito'} />} />
      {/*</Route>*/}
    </Routes>
  );
}
