import React from "react";

import { useAuth } from "../../../hooks/auth";
import MakeProposal from "./MakeProposal";
import { Navigate } from "react-router-dom";

export default function MakeProposalIndex() {
    const { type } = useAuth();
    
    if (type != "Admin") {
        return (<MakeProposal />)
    } else {
        return (<Navigate to="/forbiden" replace={true} />)
    }
}