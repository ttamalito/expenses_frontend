import { Routes, Route } from 'react-router';
import './index.css';
import { AuthProvider } from './hooks/useAuth.tsx';
import Login from './pages/login/Login.tsx';
import { constants } from '@routes';
import ExpensesLayout from './pages/layout/ExpensesLayout.tsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={'/'} element={'Hello'} />
        <Route path={'/login'} element={<Login />} />
        <Route path={constants.content} element={<ExpensesLayout />}></Route>
      </Routes>
    </AuthProvider>
  );
}
export default App;
