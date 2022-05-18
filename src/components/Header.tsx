import React from 'react';
import '../stylesheets/Header.css'

export function Header(){
    return(
        <header className="Header">
            <h1 className='Header-title'>Million Monkeys</h1>
            <a href="https://github.com/RenatoSerk" 
                className='Header-link' 
                target="_blank"
                rel="noreferrer">
                    Designed by Renato. S
            </a>
        </header>
    );
}