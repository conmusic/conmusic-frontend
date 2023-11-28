import React from "react";

import ManegeEstablishment from "./ManageEstablishment";

import { useAuth } from "../../../hooks/auth";
import { Navigate } from "react-router-dom";

export default function Explore() {
    const { type } = useAuth();

    switch (type) {
        case 'Artist':
            return (<Navigate to="/forbiden" replace={true} />);
        case 'Manager':
            return (<ManegeEstablishment></ManegeEstablishment>);        
        default:
            return (<Navigate to="/forbiden" replace={true} />)
    }
}