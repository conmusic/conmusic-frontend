import React from "react";

import { useAuth } from "../../../hooks/auth";
import BiArtist from "./BIartist";
import BiManager from "./BiManager";
import { Navigate } from "react-router-dom";


export default function BI() {
    const { type } = useAuth();

    switch (type) {
        case 'Artist':
            return (<BiArtist />);
        case 'Manager':
            return (<BiManager />);
        default:
            return (<Navigate to="/forbiden" replace={true} />)
    }
}