import React from "react";
import ExploreEventDetails from './ExploreEvent';
import { useAuth } from "../../../hooks/auth";

export default function Explore() {
    const { type } = useAuth();

    switch (type) {
        case 'Artist':
            return (<ExploreEventDetails></ExploreEventDetails>);
        case 'Manager':
            return (<></>);        
        default:
            return (<h1>Not Found</h1>)
    }
}