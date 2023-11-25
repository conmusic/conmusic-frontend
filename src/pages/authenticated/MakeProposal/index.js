import React from "react";

import { useAuth } from "../../../hooks/auth";
import MakeProposalArtist from "./MakeProposalArtist";
import MakeProposalManager from "./MakeProposalManager";
import { Navigate } from "react-router-dom";


export default function MakeProposalIndex() {
    const { type } = useAuth();
    
    switch (type) {
        case "Artist":
            return (<MakeProposalArtist />)
        case "Manager":
            return (<MakeProposalManager />)
        default:
            return (<Navigate to="/forbiden" replace={true} />)
    }
}