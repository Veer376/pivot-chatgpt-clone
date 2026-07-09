import type { Message } from "../types";
import { useState } from "react";

const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setIsLoading] = useState(false);

    const addMessage = async (message: string) => {

        try {
            // It will update the messages and will send the messages to the backend as well.
            const userMessage: Message = {
                id: crypto.randomUUID(),
                role: "user",
                content: message,
            }

            const updatedMessages = [...messages, userMessage];

            setMessages(updatedMessages);

            setIsLoading(true);

            const api_response = await fetch("http://localhost:3000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    { 
                        messages: updatedMessages 
                    }
                ),
            })

            if (!api_response.ok) {
                throw new Error("Failed to send message");
            }

            const response  = await api_response.json();

            const assistantMessage: Message = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: response.message
            }

            setMessages([...updatedMessages, assistantMessage]);

            setIsLoading(false);

        } catch (error) {
            console.log("Error sending message:", error);

            setIsLoading(false);
        }
        
        
    }

    return {
        messages,
        input,
        setInput,
        loading,
        addMessage
    }

}