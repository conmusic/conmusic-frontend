import React, { useEffect, useState } from "react";

import BiArtist from "./BiArtist";
import BiManager from "./BiManager";
import { Navigate } from "react-router-dom";

export default function BI() {
    const [access, setAccess] = useState('default');

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