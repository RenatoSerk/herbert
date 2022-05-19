import React from 'react';
import '../stylesheets/SplashScreen.css';
import shakespeare from '../resources/shakespeare.jpg';

interface SplashScreenState{
    fadeOutFinished: boolean;
}

// This should match up with the CSS value
const SPLASH_SHOW_TIME_MS = 5300;

export function SplashScreen(){

    // Initial render only
    const [mainState, setMainState] = React.useState<SplashScreenState>({fadeOutFinished: false});
    React.useEffect(() => {
        setTimeout(() => {
            setMainState({...mainState, fadeOutFinished: true});
        }, SPLASH_SHOW_TIME_MS);
    });

    // De-render HTML to match what the user sees
    if(mainState.fadeOutFinished){
        return null;
    }
    else{
        return (
            <header className={"SplashScreen"}>
                <img src={shakespeare} alt={"Shakespeare"}/>
                <p>&emsp; A million monkeys banging on a million typewriters will eventually reproduce the entire works of Shakespeare.</p>
                <small className={"SplashScreen-subtext"}>- Unknown</small>
            </header>
        );
    }
}