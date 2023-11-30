import React, { useEffect } from "react";

import Events from "./Events";

import { useAuth } from "../../../hooks/auth";
import { Navigate } from "react-router-dom";

export default function Explore() {
    const [access, setAccess] = React.useState('default');

    useEffect(() => {
        setAccess(localStorage.getItem('@conmusic:type'));
    }, []);

    switch (access) {
        case 'Artist':
            return (<Navigate to="/forbiden" replace={true} />);
        case 'Manager':
            return (<Events></Events>);
        case 'default':
            return (<></>)
        default:
            return (<Navigate to="/forbiden"  />)
    }
}