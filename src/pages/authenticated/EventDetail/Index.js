import React from "react";

import { useAuth } from "../../../hooks/auth";

import EventDetail from './EventDetail';
import { Navigate } from "react-router";
import	{	useEffect	}	from	'react';

export default function Explore() {
    const [access, setAccess] = React.useState('default');

    useEffect(() => {
        setAccess(localStorage.getItem('@conmusic:type'));
    }, []);

    switch (access) {
        case 'Artist':
            return (<Navigate to="/forbiden"/>);
        case 'Manager':
            return (<EventDetail></EventDetail>);
        case 'default':
            return (<></>)
        default:
            return (<Navigate to="/forbiden" />)
    }
}