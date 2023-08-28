import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterStepOne from './pages/RegisterStepOne';
import RegisterStepTwo from './pages/RegisterStepTwo';

import DashBoard from './pages/authenticated/DashBoard';
import Layout from './layouts/Layout';
import NegotiationDetails from './pages/authenticated/NegotiationDetails';

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterStepOne />} />
      <Route path="/register-two-step" element={<RegisterStepTwo />} />
      <Route path="/dashboard" element={<Layout component={DashBoard} />} />
      <Route path="/negotiations/:showId" element={<Layout component={NegotiationDetails} />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}
