import React from "react";

import { useAuth } from "../../../hooks/auth";

import ProposalsArtist from "./ProposalsArtist";
import ProposalsManager from "./ProposalsManager";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export default function Proposals() {
    const [access, setAccess] = React.useState('default');

    useEffect(() => {
        setAccess(localStorage.getItem('@conmusic:type'));
    }, []);;

    switch (access) {
        case "Artist":
            return (<ProposalsArtist />);
        case "Manager":
            return (<ProposalsManager />);
                    case 'default':
            return (<></>)
        default:
            return (<Navigate to="/forbiden" replace={true} />);
    }
}