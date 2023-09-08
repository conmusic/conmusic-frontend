import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterStepOne from './pages/RegisterStepOne';
import RegisterStepTwo from './pages/RegisterStepTwo';
import Proposal from "./pages/authenticated/Proposal";
import Oportunity from "./pages/authenticated/Oportunity";
import DashBoard from './pages/authenticated/DashBoard';

import Layout from './layouts/Layout';
import NegotiationDetails from './pages/authenticated/NegotiationDetails';
import Album from './pages/authenticated/Album';
import OpportunityDetails from './pages/authenticated/OpportunityDetails';

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterStepOne />} />
      <Route path="/register-two-step" element={<RegisterStepTwo />} />
      <Route element={<Layout />} >
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/explore" element={<Album />} /> 
        <Route path="/explore/:10" element={<OpportunityDetails />} /> 
        <Route path="/negotiations/:showId" element={<NegotiationDetails />} />
        <Route path="/proposal" element={<Proposal />} />
        <Route path="/oportunity" element={<Oportunity />} />
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}
