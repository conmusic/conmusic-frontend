import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterStepOne from './pages/RegisterStepOne';
import RegisterStepTwo from './pages/RegisterStepTwo';

import DashBoard from './pages/authenticated/DashBoard';
import Layout from './layouts/Layout';
import NegotiationDetails from './pages/authenticated/NegotiationDetails';
import DashBoardAdmin from './pages/authenticated/DashBoardAdmin';

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterStepOne />} />
      <Route path="/register-two-step" element={<RegisterStepTwo />} />
      <Route element={<Layout />} >
        <Route path="/dash-admin" element={<DashBoardAdmin />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/negotiations/:showId" element={<NegotiationDetails />} />
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}
