import React from "react";
import Album from "./Album";
import { useAuth } from "../../../hooks/auth";

export default function Explore() {
    const { type } = useAuth();

    switch (type) {
        case 'Artist':
            return (<Album></Album>);
        case 'Manager':
            return (<></>);        
        default:
            return (<h1>Unauthorized</h1>)
    }
}