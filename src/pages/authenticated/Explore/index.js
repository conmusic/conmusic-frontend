import React from "react";

import Album from "./Album";
import Tinder from "./Tinder";

import { useAuth } from "../../../hooks/auth";
import { Navigate } from "react-router-dom";

export default function Explore() {
    const { type } = useAuth();

    switch (type) {
        case 'Artist':
            return (<Album></Album>);
        case 'Manager':
            return (<Tinder></Tinder>);        
        default:
            return (<Navigate to="/forbiden" replace={true} />)
    }
}