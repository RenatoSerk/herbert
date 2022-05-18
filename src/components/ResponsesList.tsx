import React from 'react'
import '../stylesheets/ResponseList.css'

interface ResponsesListProps{
    data: {prompt: string, response: string}[]
}

export function ResponseList(props: ResponsesListProps){

    const dataToElements = (data: {prompt: string, response: string}[]) => {
        let idCounter = -1;
        return data.map((dataObj) => {
            idCounter ++;
            return(
                <li className='ResponseList-item' key={idCounter}>
                    <p><b>Prompt:</b> {dataObj.prompt}</p>
                    <p><b>Response:</b> {dataObj.response}</p>
                </li>
            );
        });
    }

    let elementsArray = React.useMemo(() => {
        return dataToElements(props.data);
    }, [props.data]);

    if (props.data.length === 0) return null;
    else{
        return (
            <div className='ResponseList-container'>
                <h1>
                    RESPONSES
                </h1>
                <ul className='ResponseList-list'>
                    {elementsArray}
                </ul>
            </div>
        );
    }
}