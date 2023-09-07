import React from "react";
import DashboardArtist from "./Artist";
import DashboardEstablishment from "./Establishment";
import DashBoardAdmin from "./Admin";
import { useAuth } from "../../../hooks/auth";

export default function DashBoard() {
    const { type } = useAuth();

    switch (type) {
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