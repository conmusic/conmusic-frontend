import React from 'react';

import { useAuth } from '../../../hooks/auth';

import ProposalArtist from './ProposalArtist';
import ProposalEvent from './ProposalEvent';
import { Navigate } from "react-router-dom";
import { useEffect } from 'react';

export default function ProposalDetails() {
    const [access, setAccess] = React.useState('default');

    useEffect(() => {
        setAccess(localStorage.getItem('@conmusic:type'));
    }, []);;

    switch (access) {
        case "Artist":
            return (<ProposalEvent />);
        case "Manager":
            return (<ProposalArtist />);
        case 'default':
            return (<></>)
        default:
            return (<Navigate to="/forbiden" replace={true} />)
    }
}