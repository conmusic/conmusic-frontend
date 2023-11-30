import React from "react";

import { useAuth } from "../../../hooks/auth";
import { Navigate } from "react-router-dom";

import ExploreEventDetails from './ExploreEvent';
import { useEffect } from "react";

export default function Explore() {
    const [access, setAccess] = React.useState('default');

    useEffect(() => {
        setAccess(localStorage.getItem('@conmusic:type'));
    }, []);;

    switch (access) {
        case 'Artist':
            return (<ExploreEventDetails></ExploreEventDetails>);
        case 'Manager':
            return (<Navigate to="/forbiden" replace={true} />);
        case 'default':
            return (<></>)
        default:
            return (<Navigate to="/forbiden" replace={true} />)
    }
}