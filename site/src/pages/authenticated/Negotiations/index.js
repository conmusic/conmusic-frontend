import { useAuth } from "../../../hooks/auth";
import NegotiationsArtist from "./NegotiationsArtist";

export default function Negotiations() {
    const { type } = useAuth();

    switch (type) {
        case "Artist":
            return (<NegotiationsArtist />);
        case "Manager":
            return (<></>);
        default:
            return (<h1>Unathorized</h1>)
    }
}