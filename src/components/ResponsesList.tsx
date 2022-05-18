import React from 'react'
import '../stylesheets/ResponseList.css'

interface ResponsesListProps{
    data: {prompt: string, response: string}[]
}

export function ResponseList(props: ResponsesListProps){
    return (
        <ul className='ResponseList-container'>
            <li>
                Item 1
            </li>
        </ul>
    );
}