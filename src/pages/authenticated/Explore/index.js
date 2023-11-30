import React from "react";

import Album from "./Album";
import Tinder from "./Tinder";

import { useAuth } from "../../../hooks/auth";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export default function Explore() {
    const [access, setAccess] = React.useState('default');

    useEffect(() => {
        setAccess(localStorage.getItem('@conmusic:type'));
    }, []);

    switch (access) {
        case 'Artist':
            return (<Album></Album>);
        case 'Manager':
            return (<Tinder></Tinder>);
        case 'default':
            return (<></>)
        default:
            return (<Navigate to="/forbiden" replace={true} />)
    }
}