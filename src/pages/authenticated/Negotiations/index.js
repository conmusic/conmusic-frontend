import { useAuth } from "../../../hooks/auth";
import NegotiationsArtist from "./NegotiationsArtist";
import NegotiationsManager from "./NegotiationsManager";
import { Navigate } from "react-router-dom";
import React, { useEffect } from "react";

export default function Negotiations() {
    const [access, setAccess] = React.useState('default');

    useEffect(() => {
        setAccess(localStorage.getItem('@conmusic:type'));
    }, []);;

    switch (access) {
        case "Artist":
            return (<NegotiationsArtist />);
        case "Manager":
            return (<NegotiationsManager />);
        case 'default':
            return (<></>)
        default:
            return (<Navigate to="/forbiden" replace={true} />)
    }
}