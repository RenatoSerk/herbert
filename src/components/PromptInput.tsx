import React from 'react';
import '../stylesheets/PromptInput.css';

interface PromptInputProps{
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    onSubmit: () => void;
    onRandomPrompt: () => void
    disable?: boolean;
}

export function PromptInput(props: PromptInputProps){

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter'){
            event.preventDefault();
            event.stopPropagation();
            props.onSubmit();
        }
    }

    return (
        <form className="PromptInput-container">
            <div className='PromptInput-textareaContainer'>
                <textarea className="PromptInput-textarea"
                    value={props.value}
                    onChange={props.onChange}
                    disabled={props.disable ? props.disable : false}
                    placeholder={"Write a prompt for a story or hit 'Random Prompt' to get one!"}
                    onKeyDown={handleKeyDown}
                    autoFocus={true}
                />
            </div>
            <div className='PromptInput-buttonsContainer'>
                <button className='PromptInput-button'
                    type={'button'}
                    onClick={props.onRandomPrompt}
                    disabled={props.disable ? props.disable : false}
                >   
                    Random Prompt
                </button>
                <button className='PromptInput-button'
                    type={'button'}
                    onClick={props.onSubmit}
                    disabled={(props.disable ? props.disable : false || props.value === "")}
                >
                    Submit
                </button>
            </div>
        </form>
    );
}