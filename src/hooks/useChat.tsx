import type { Message } from "../types";
import { useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [model, setModel] = useState("llama-3.1-8b-instant");

  const addMessage = async (message: string) => {
    try {
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: message,
      };

      const updatedMessages = [...messages, userMessage];

      setMessages(updatedMessages);
      setIsLoading(true);
      setInput("");

      await fetchEventSource("http://localhost:3000/chat-stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
          model: model,
        }),
        onmessage(event: any) {
          const data = JSON.parse(event.data);
          if (data.content) {
            setMessages((prevMessages) => {
              const lastMsg = prevMessages[prevMessages.length - 1];

              if (lastMsg.role !== "assistant") {
                return [
                  ...prevMessages,
                  {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content: data.content,
                  },
                ];
              } else {
                return [
                  ...prevMessages.slice(0, -1),
                  {
                    ...lastMsg,
                    content: lastMsg.content + data.content,
                  },
                ];
              }
            });
          }
        },
      });

      setIsLoading(false);
    } catch (error) {
      console.log("Error sending message:", error);
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    loading,
    addMessage,
    model,
    setModel,
  };
};

export default useChat;
