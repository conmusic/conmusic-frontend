import React from "react";

import { useAuth } from "../../../hooks/auth";
import BiArtist from "./BiArtist";
import BiManager from "./BiManager";


export default function BI() {
    const { type } = useAuth();

    switch (type) {
        case 'Artist':
            return (<BiArtist />);
        case 'Manager':
            return (<BiManager />);
        default:
            return (<h1>Unathorized</h1>)
    }
}