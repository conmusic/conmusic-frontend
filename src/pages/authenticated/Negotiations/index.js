import { useAuth } from "../../../hooks/auth";
import NegotiationsArtist from "./NegotiationsArtist";
import NegotiationsManager from "./NegotiationsManager";
import { Navigate } from "react-router-dom";

export default function Negotiations() {
    const { type } = useAuth();

    switch (type) {
        case "Artist":
            return (<NegotiationsArtist />);
        case "Manager":
            return (<NegotiationsManager />);
        default:
            return (<Navigate to="/forbiden" replace={true} />)
    }
}