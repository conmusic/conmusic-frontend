import React, { useCallback, useEffect, useRef, useState } from "react";
import { Timestamp, onSnapshot, collection, query, orderBy, addDoc } from "firebase/firestore";
import { format } from 'date-fns';
import { ptBR } from "date-fns/locale";
import { Box, Fab, InputBase, Stack, Typography } from "@mui/material";
import { Send } from '@mui/icons-material';

import db from '../../../services/firebase/firestore';
import { useAuth } from "../../../hooks/auth";

export default function Chat({ showId, otherUserName }) {
    const { userId, user } = useAuth();
    
    const [messages, setMessages] = useState([])
    const [text, setText] = useState("")
    
    const messagesRef = useRef([])

    useEffect(() => {
        const queryMessages = query(collection(db, `chat/${showId}/messages`), orderBy('sentDate', 'asc'))

        const subscribe = onSnapshot(
            queryMessages, 
            (querySnapshot) => {
                const foundMessages = querySnapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        content: doc.data().content,
                        userId: doc.data().userId,
                        sentDate: doc.data().sentDate
                    }
                })

                setMessages(foundMessages)
            }
        );
        
        return () => subscribe;
    }, [showId]);

    useEffect(() => {
        if (messages.length > 0) {
            let size = messagesRef.current.length;
            messagesRef.current[size - 1].focus();
        }
    }, [messages, messagesRef])

    const handleSendMessage = useCallback(() => {
        async function sendMessage() {
            await addDoc(collection(db, `chat/${showId}/messages`), {
                content: text,
                sentDate: Timestamp.fromDate(new Date()),
                userId: userId
            })
            
            setText("")
        }

        sendMessage()
    }, [text, showId, userId]);

    return (
        <Stack 
            spacing={1} 
            alignItems="stretch" 
            sx={{ maxHeight: '100vh' }}
        >
            <Stack 
                overflow="auto"
                direction="column"
                spacing={1}
                sx={{ maxHeight: 1, paddingX: 2, paddingY: 1 }}
            >
                {
                    messages.length 
                        ? messages.map(m => (
                            <Box 
                                key={`MessageBox#${m.id}`} 
                                sx={{
                                    width: "44%",
                                    color: "#F2F2F2",
                                    backgroundColor: m.userId !== userId ? "#FF3E3A" : "#CC3245",
                                    alignSelf: m.userId !== userId ? "flex-start" : "flex-end",
                                    paddingX:2,
                                    paddingY:1,                                   
                                    borderTopLeftRadius: m.userId !== userId ? 0 : 10,
                                    borderTopRightRadius: m.userId !== userId ? 10 : 0,
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                }}
                                ref={(messageBox) => (messagesRef.current = [...messagesRef.current, messageBox])}
                            >
                                <Typography key={`MessageSender${m.id}`} variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                    {m.userId !== userId ? otherUserName : `${user.name} (Você)`}
                                </Typography>
                                <Typography key={`MessageText${m.id}`} variant="body1">
                                    {m.content}
                                </Typography>
                                <Typography 
                                    key={`MessageTime#${m.id}`}
                                    variant="caption" 
                                    align={ m.userId !== userId ? "right" : "left" }
                                    textTransform="capitalize"
                                >
                                    <Box key={`MessageTimeBox#${m.id}`} mt={1}>
                                        {format(m.sentDate.toDate(), "eeeeee, Pp", { locale: ptBR })}
                                    </Box>
                                </Typography>
                            </Box>
                        ))
                        : <Typography>Nenhuma mensagem foi enviada no momento</Typography>
                }
            </Stack>
            <Stack direction="row">
                <InputBase
                    style={{ padding: "10px" }}                    
                    placeholder="Insira aqui sua mensagem"
                    multiline
                    rows={2}
                    className="chat-input-field"
                    fullWidth
                    onChange={(event) => setText(event.target.value)}
                    value={text}
                />
                <Fab onClick={handleSendMessage} style={{ margin: "8px" }} color="rgba(29, 185, 84, 0.25)" aria-label="add">
                    <Send style={{ fontSize: "25px" }} />
                </Fab>
            </Stack>
        </Stack>
    );
}