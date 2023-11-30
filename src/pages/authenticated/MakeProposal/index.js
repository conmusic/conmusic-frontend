import React from "react";

import { useAuth } from "../../../hooks/auth";
import MakeProposalArtist from "./MakeProposalArtist";
import MakeProposalManager from "./MakeProposalManager";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";


export default function MakeProposalIndex() {
    const [access, setAccess] = React.useState('default');

    useEffect(() => {
        setAccess(localStorage.getItem('@conmusic:type'));
    }, []);;

    switch (access) {
        case "Artist":
            return (<MakeProposalArtist />)
        case "Manager":
            return (<MakeProposalManager />)
        case 'default':
            return (<></>)
        default:
            return (<Navigate to="/forbiden" replace={true} />)
    }
}