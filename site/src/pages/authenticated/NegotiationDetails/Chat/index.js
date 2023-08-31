import React, { useState } from "react";
import { Fab, InputBase, ListItemText } from "@mui/material";
import { Send } from '@mui/icons-material';

import './style.css'

export default function Chat() {
    const [messages, setMessages] = useState([1,1,11,])
    const [text, setText] = useState("")

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {
                    messages.map(m => (
                        <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
                            <div style={{ height: '7%', maxWidth: "fit-content"}}>
                                <ListItemText primary={"message"} sx={{ background: '#88d4dc', color: '#ffffff', height: '7%', minWidth: '50%', margin: '25px', padding: '10px' }} />
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="chat-input-container">
                <InputBase
                    style={{ padding: "10px" }}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Insira aqui sua mensagem"
                    autoFocus={true}
                    multiline
                    rows={2}
                    className="chat-input-field"
                    fullWidth
                    onChange={() => console.log(0)}
                    value={text}
                />
                <Fab onClick={() => console.log("enviar")} style={{ margin: "8px" }} color="rgba(29, 185, 84, 0.25)" aria-label="add">
                    <Send style={{ fontSize: "25px" }} />
                </Fab>
            </div>
        </div>
    );
}