import { Routes, Route } from 'react-router';
import './index.css';
import { AuthProvider } from './hooks/useAuth.tsx';
import Login from './pages/login/Login.tsx';
import { constants } from '@routes';
import ExpensesLayout from './pages/layout/ExpensesLayout.tsx';
import Home from './pages/content/home/Home.tsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={'/'} element={'Hello'} />
        <Route path={'/login'} element={<Login />} />
        <Route path={constants.Content} element={<ExpensesLayout />}>
          <Route path={'/'} index element={<Home />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
export default App;
