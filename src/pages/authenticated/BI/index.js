import React from "react";

import { useAuth } from "../../../hooks/auth";
import BIartist from "./BIartist";
import BImaneger from "./BImaneger";
import { Navigate } from "react-router-dom";


export default function BI() {
    const { type } = useAuth();

    switch (type) {
        case 'Artist':
            return (<BIartist />);
        case 'Manager':
            return (<BImaneger />);
     
        default:
            return (<Navigate to="/forbiden" replace={true} />)
    }
}