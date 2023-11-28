import React from "react";

import { useAuth } from "../../../hooks/auth";

import EventDetail from './EventDetail';
import { Navigate } from "react-router";

export default function Explore() {
    const { type } = useAuth();

    switch (type) {
        case 'Artist':
            return (<Navigate to="/forbiden" replace={true} />);
        case 'Manager':
            return (<EventDetail></EventDetail>);        
        default:
            return (<></>)
    }
}