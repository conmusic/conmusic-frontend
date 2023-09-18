import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterStepOne from './pages/RegisterStepOne';
import RegisterStepTwo from './pages/RegisterStepTwo';

import Layout from './layouts/Layout';
import Dashboard from './pages/authenticated/Dashboard';
import Explore from './pages/authenticated/Explore';
import ExploreDetails from './pages/authenticated/ExploreDetails';
import Negotiations from './pages/authenticated/Negotiations';
import NegotiationDetails from './pages/authenticated/NegotiationDetails';
import ManageEstablishment from './pages/authenticated/ManageEstablishment';
import ProposalDetails from './pages/authenticated/ProposalDetails';

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterStepOne />} />
      <Route path="/register-two-step" element={<RegisterStepTwo />} />
      <Route element={<Layout />} >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} /> 
        <Route path="/explore/:exploreId" element={<ExploreDetails />} /> 
        <Route path="/establishments" element={<ManageEstablishment />} />
        <Route path="/negotiations" element={<Negotiations />} />
        <Route path="/negotiations/:showId" element={<NegotiationDetails />} />
        <Route path="/proposals/:proposalId" element={<ProposalDetails />} /> 
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}
