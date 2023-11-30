import React from "react";

import ManegeEstablishment from "./ManageEstablishment";

import { useAuth } from "../../../hooks/auth";
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
            return (<ManegeEstablishment></ManegeEstablishment>);
        case 'default':
            return (<></>)
        default:
            return (<Navigate to="/forbiden" replace={true} />)
    }
}