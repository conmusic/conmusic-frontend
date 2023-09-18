import React from 'react';

import { useAuth } from '../../../hooks/auth';

import ProposalArtist from './ProposalArtist';
import ProposalEvent from './ProposalEvent';

export default function ProposalDetails() {
    const { type } = useAuth();

    switch (type) {
        case "Artist":
            return (<ProposalEvent />);
        case "Manager":
            return (<ProposalArtist />);
        default:
            return (<h1>Unauthorized</h1>);
    }
}