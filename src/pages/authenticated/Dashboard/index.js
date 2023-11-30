import React from "react";

import { useAuth } from "../../../hooks/auth";

import DashboardArtist from "./Artist";
import DashboardEstablishment from "./Manager";
import DashboardAdmin from "./Admin";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";


export default function Dashboard() {
    const [access, setAccess] = React.useState('default');

    useEffect(() => {
        setAccess(localStorage.getItem('@conmusic:type'));
    }, []);

    switch (access) {
        case 'Artist':
            return (<DashboardArtist />);
        case 'Manager':
            return (<DashboardEstablishment />);
        case 'Admin':
            return (<DashboardAdmin />)
        case 'default':
            return (<></>)
        default:
            return (<Navigate to="/forbiden" replace={true} />)
    }
}