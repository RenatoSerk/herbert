import React from 'react';
import '../stylesheets/LoadingScreen.css'
import shakespeare from '../resources/shakespeare.jpg'

interface LoadingScreenProps {
    loading: boolean;
}

export function LoadingScreen(props: LoadingScreenProps) {
    const [loadingElem, setLoadingElem] = React.useState(<></>);

    React.useEffect(() => {
        if (!props.loading){
            // Fade out then de-render after fade is done
            setLoadingElem(
                <img src={shakespeare} 
                className='LoadingScreen-img' 
                alt='loading' 
                style={{animation: 'appLogoSpin infinite 3s linear, fadeOut 0.5s ease 0s 1 normal forwards'}}
                />
            );
            setTimeout(() => {
                setLoadingElem(<></>);
            }, 500);
        }
        else{
            setLoadingElem(<img src={shakespeare} className='LoadingScreen-img' alt='loading'/>);
        }
    }, [props.loading]);

    // Set to empty fragment on first render
    React.useEffect(() => {
        setLoadingElem(<></>);
    }, []);

    return loadingElem;
}
