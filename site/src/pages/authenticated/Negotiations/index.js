import { useAuth } from "../../../hooks/auth";
import NegotiationsArtist from "./NegotiationsArtist";
import NegotiationsManager from "./NegotiationsManager";

export default function Negotiations() {
    const { type } = useAuth();

    switch (type) {
        case "Artist":
            return (<NegotiationsArtist />);
        case "Manager":
            return (<NegotiationsManager />);
        default:
            return (<h1>Unathorized</h1>)
    }
}