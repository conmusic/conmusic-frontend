import React from "react";

import ManageEstablishment from "./ManageEstablishment";

import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export default function Explore() {
    const [access, setAccess] = React.useState('default');

    useEffect(() => {
        setAccess(localStorage.getItem('@conmusic:type'));
    }, []);;

    switch (access) {
        case 'Artist':
            return (<Navigate to="/forbiden" replace={true} />);
        case 'Manager':
            return (<ManageEstablishment></ManageEstablishment>);
        case 'default':
            return (<></>)
        default:
            return (<Navigate to="/forbiden" replace={true} />)
    }
}