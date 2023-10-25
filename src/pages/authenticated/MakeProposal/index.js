import React from "react";

import { useAuth } from "../../../hooks/auth";
import MakeProposal from "./MakeProposal";

export default function MakeProposalIndex() {
    const { type } = useAuth();
    
    if (type != "Admin") {
        return (<MakeProposal />)
    } else {
        return (<h1>Unauthorized</h1>)
    }
}