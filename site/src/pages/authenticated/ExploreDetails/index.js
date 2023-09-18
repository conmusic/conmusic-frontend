import React from "react";

import { useAuth } from "../../../hooks/auth";

import ExploreEventDetails from './ExploreEvent';

export default function Explore() {
    const { type } = useAuth();

    switch (type) {
        case 'Artist':
            return (<ExploreEventDetails></ExploreEventDetails>);
        case 'Manager':
            return (<></>);        
        default:
            return (<h1>Unauthorized</h1>)
    }
}