import { Chip } from "@mui/material";
import React, { useMemo } from "react";
import showStatusHelper from "../helpers/showStatusHelper";

export default function StatusChip({ label, ...props }) {
    const color = useMemo(() => {
        switch (label) {
            case "MANAGER_PROPOSAL":
            case "ARTIST_PROPOSAL":
            case "NEGOTIATION":
            case "ARTIST_ACCEPTED":
            case "MANAGER_ACCEPTED":
                return "primary";
            case "CONFIRMED":
            case "CONCLUDED":
                return "success";
            case "MANAGER_REJECTED":
            case "ARTIST_REJECTED":
            case "ARTIST_WITHDRAW":
            case "MANAGER_WITHDRAW":
            case "MANAGER_CANCELED":
            case "ARTIST_CANCELED":
                return "error";
            default:
                return "default"
        }
    }, [label])

    return (
        <Chip {...props} color={color} label={showStatusHelper.getDisplayName(label)} />
    )
}