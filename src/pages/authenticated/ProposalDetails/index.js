import React from 'react';

import { useAuth } from '../../../hooks/auth';

import ProposalArtist from './ProposalArtist';
import ProposalEvent from './ProposalEvent';
import { Navigate } from "react-router-dom";

export default function ProposalDetails() {
    const { type } = useAuth();

    switch (type) {
        case "Artist":
            return (<ProposalEvent />);
        case "Manager":
            return (<ProposalArtist />);
        default:
            return (<Navigate to="/forbiden" replace={true} />)
    }
}