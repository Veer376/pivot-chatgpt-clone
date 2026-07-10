interface ComposerProps {
    onChange: (value: string) => void;
    value: string;
    onSend: (message: string) => void;
    model: string;
    setModel: (model: string) => void;
}

export default function Composer( props: ComposerProps ) {
    const { onChange, value, onSend, model, setModel} = props;


    return (

        <div className="flex items-center bg-blue-100 rounded-full p-2 mx-4 mb-6"> 
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 pl-4 outline-none bg-transparent"
                type="text"
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        onSend(value);
                    }
                }}
            >
            </input>


            <select
                value={model}
                onChange={(event) => setModel(event.target.value)}
                className="outline-none pr-2 mr-6"
            >
                <option value="openai/gpt-oss-20b">openai/gpt-oss-20b</option>
                <option value="qwen/qwen3-32b">qwen/qwen3-32b</option>
                <option value="llama-3.1-8b-instant">lllama-3.1-8b-instant</option>
            </select>


            <button 
                disabled={value.trim() === ""}
                onClick={() => onSend(value)}
                className="ml-2 bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-full"
            >
                Send
            </button>
            
        </div>
    )

}