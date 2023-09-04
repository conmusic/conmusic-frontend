import React from "react";
import DashboardArtist from "./Artist";
import DashboardEstablishment from "./Establishment";
import DashBoardAdmin from "./Admin";

export default function DashBoard() {
    const userType = "Admin"

    switch (userType) {
        case 'Artist':
            return (<DashboardArtist />);
        case 'Manager':
            return (<DashboardEstablishment />);
        case 'Admin':
            return (<DashBoardAdmin />)
        default:
            return (<h1>Not Found</h1>)
    }
}