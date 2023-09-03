import React from "react";
import DashboardArtist from "./Artist";
import DashboardEstablishment from "./Establishment";

export default function DashBoard() {
    const userType = "Manager"

    switch (userType) {
        case 'Artist':
            return (<DashboardArtist />);
        case 'Manager':
            return (<DashboardEstablishment />);
        case 'Admin':
            return (<></>)
        default:
            return (<h1>Not Found</h1>)
    }
}