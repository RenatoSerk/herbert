import React from 'react'
import '../stylesheets/ResponseList.css'

interface ResponsesListProps{
    data: {prompt: string, response: string}[]
}

export function ResponseList(props: ResponsesListProps){

    const dataToElements = (data: {prompt: string, response: string}[]) => {
        // Starting with a high key and subtracting fixes the problem of the last element
        // animating in a list instead of the new one when you add the new one to the front
        // It is interesting that React will apply CSS animations to the element
        // with the highest key when a new one is added to a list
        let idCounter = data.length;
        return data.map((dataObj) => {
            if (idCounter === data.length){
                // Make first item take up a whole row
                idCounter--;
                return(
                    <li className='ResponseList-item_first' key={idCounter}>
                        <p><b>Prompt:</b> {dataObj.prompt}</p>
                        <p><b>Response:</b> {dataObj.response}</p>
                    </li>
                );
            }
            idCounter --;
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