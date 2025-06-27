import React from 'react';
import { Route, Routes } from 'react-router';
import Unauthorized from '../fallback/Unauthorized';
import InternalAPINotFound from '../fallback/InternalAPINotFound';
import InternalError from '../fallback/InternalError';
import {
  internalErrorRoute,
  notFoundRoute,
  unauthorizedRoute,
} from './paths/fallbackRoutesPaths';
import LandingPage from '../landingPage/LandingPage';
import Login from '../auth/Login';
import SignUp from '../auth/SignUp';

export default function FallBackRoutes() {
  return (
    <Routes>
      <Route path={unauthorizedRoute} element={<Unauthorized />} />
      <Route path={'/'} element={<LandingPage />} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/signup'} element={<SignUp />} />
    </Routes>
  );
}
