import React from "react";

import { useAuth } from "../../../hooks/auth";

import ProposalsArtist from "./ProposalsArtist";
import ProposalsManager from "./ProposalsManager";

export default function Proposals() {
    const { type } = useAuth();

    switch (type) {
        case "Artist":
            return (<ProposalsArtist />);
        case "Manager":
            return (<ProposalsManager />);
        default:
            return (<h1>Unathorized</h1>);
    }
}