import React from "react";

import { useAuth } from "../../../hooks/auth";

import Tinder from './Tinder';

export default function Tinder() {
    const { type } = useAuth();
    return (<Tinder></Tinder>);
}