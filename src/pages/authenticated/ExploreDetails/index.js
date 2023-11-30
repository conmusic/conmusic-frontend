import React from "react";

import { useAuth } from "../../../hooks/auth";
import { Navigate } from "react-router-dom";

import ExploreEventDetails from './ExploreEvent';

export default function Explore() {
    const { type } = useAuth();

    switch (type) {
        case 'Artist':
            return (<ExploreEventDetails></ExploreEventDetails>);
        case 'Manager':
            return (<Navigate to="/forbiden" replace={true} />);        
        default:
            return (<Navigate to="/forbiden" replace={true} />)
    }
}