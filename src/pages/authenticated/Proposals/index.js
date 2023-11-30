import React from "react";

import { useAuth } from "../../../hooks/auth";

import ProposalsArtist from "./ProposalsArtist";
import ProposalsManager from "./ProposalsManager";
import { Navigate } from "react-router-dom";

export default function Proposals() {
    const { type } = useAuth();

    switch (type) {
        case "Artist":
            return (<ProposalsArtist />);
        case "Manager":
            return (<ProposalsManager />);
        default:
            return (<Navigate to="/forbiden" replace={true} />);
    }
}