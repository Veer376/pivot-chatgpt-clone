import { useState } from 'react'
import Composer from './components/composer.tsx'
import MessagesContainer from './components/MessagesContainer.tsx'
import useChat from './hooks/useChat.tsx'

function App() {
  const {
        messages,
        input,
        setInput,
        loading,
        addMessage,
        model,
        setModel
    } = useChat();

  return (
    <>
      <div className="h-dvh bg-slate-50 flex flex-col">
        <MessagesContainer messages={messages} isLoading={loading} />
        <Composer onChange={setInput} value={input} onSend={addMessage} model={model} setModel={setModel} />
      </div>
    </>
  )
}

export default App
