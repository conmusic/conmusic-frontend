import React from "react";

import { useAuth } from "../../../hooks/auth";
import MakeProposal from "./MakeProposalArtist";

export default function MakeProposalIndex() {
    const { type } = useAuth();
    
    switch (type) {
        case "Artist":
            return (<MakeProposal />)
        case "Manager":
            return (<></>)
        default:
            return (<h1>Unauthorized</h1>)
    }
}