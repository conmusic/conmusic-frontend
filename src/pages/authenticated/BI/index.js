import React from "react";

import { useAuth } from "../../../hooks/auth";
import BiArtist from "./BIartist";
import BiManager from "./BiManager";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export default function BI() {
    const [access, setAccess] = React.useState('default');

    useEffect(() => {
        setAccess(localStorage.getItem('@conmusic:type'));
    }, []);

    switch (access) {
        case 'Artist':
            return (<BiArtist />);
        case 'Manager':
            return (<BiManager />);
        case 'default':
            return (<></>)
        default:
            return (<Navigate to="/forbiden" replace={true} />)
    }
}