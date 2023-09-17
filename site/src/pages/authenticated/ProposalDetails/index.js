import React from 'react';
import { useAuth } from '../../../hooks/auth';
import ProposalArtist from './ProposalArtist';

export default function ProposalDetails() {
    const { type } = useAuth();

    switch (type) {
        case "Artist":
            return (<ProposalArtist />);
        default:
            return (<></>);
    }
}