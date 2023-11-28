import React from "react";

import UserFormArtist from './UserFormArtist'
import UserFormManager from './UserFormManager'

import { useAuth } from "../../../hooks/auth";

export default function Profile() {
    const { type } = useAuth();
    
    switch (type) {
        case 'Artist':
            return (<UserFormArtist />);
        case 'Manager':
            return (<UserFormManager />);
        case 'Admin':
            return (<></>);
        default:
            return (<h1>Unathorized</h1>)
    }
}