interface ComposerProps {
    onChange: (value: string) => void;
    value: string;
    onSend: (message: string) => void;
}

function Composer( props: ComposerProps ) {
    const { onChange, value, onSend } = props;


    return (
        <div className="flex items-center gap-2 p-4 border-2 rounded-full">
            <input
                type="text"
                className="flex-1 px-4 bg-transparent focus:outline-2 focus:outline-blue-500"
                placeholder="What you have got for today?"
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >
            </input>
        </div>
    )
}


