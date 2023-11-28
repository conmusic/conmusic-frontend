import React from "react";

import Events from "./Events";

import { useAuth } from "../../../hooks/auth";
import { Navigate } from "react-router-dom";

export default function Explore() {
    const { type } = useAuth();

    switch (type) {
        case 'Artist':
            return (<Navigate to="/forbiden" replace={true} />);
        case 'Manager':
            return (<Events></Events>);        
        default:
            return (<Navigate to="/forbiden" replace={true} />)
    }
}