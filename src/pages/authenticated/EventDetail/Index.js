import React from "react";

import { useAuth } from "../../../hooks/auth";

import EventDetail from './EventDetail';

export default function Explore() {
    const { type } = useAuth();

    switch (type) {
        case 'Artist':
            return (<></>);
        case 'Manager':
            return (<EventDetail></EventDetail>);        
        default:
            return (<h1>Unauthorized</h1>)
    }
}