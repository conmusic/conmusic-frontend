import React from "react";

import { useAuth } from "../../../hooks/auth";

import DashboardArtist from "./Artist";
import DashboardEstablishment from "./Manager";
import DashboardAdmin from "./Admin";

export default function Dashboard() {
    const { type } = useAuth();

    switch (type) {
        case 'Artist':
            return (<DashboardArtist />);
        case 'Manager':
            return (<DashboardEstablishment />);
        case 'Admin':
            return (<DashboardAdmin />)
        default:
            return (<h1>Unathorized</h1>)
    }
}