import React from "react";

export default function CustomTabPanel({
    children,
    value, 
    index,
    ...others
}) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tabpanel-${index}`}
            {...others}
        >
            {value === index && (children)}
        </div>
    )
}