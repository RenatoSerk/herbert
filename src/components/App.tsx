import React from 'react';
import '../stylesheets/App.css';
import { Header } from './Header';
import { LoadingScreen } from './LoadingScreen';
import { PromptInput } from './PromptInput';
import { ResponseList } from './ResponsesList';
import { SplashScreen } from './SplashScreen';

interface MainState{
  promptVal: string;
  promptResponseObjects: {prompt: string, response: string}[];
  fetchingData: boolean;
  fetchError: string;
}

interface APIResult{
  choices: { text: string }[];
  created: Date;
}

const SECRET_TOKEN = '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';

function App() {
  const initialMainState: MainState = {
    promptVal: "",
    promptResponseObjects: [],
    fetchingData: false,
    fetchError: ""
  };

  const [mainState, setMainState] = React.useState<MainState>(initialMainState);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMainState({...mainState, promptVal: e.target.value});
  }

  // Appends '...' to the end of the string if it abruptly stops
  const formatResultString = (resultString: string) => {
    let newResultString = resultString.substring(0);
    if (!newResultString.match(/[.!?]$/)){
      if (newResultString.endsWith(',')) newResultString = newResultString.substring(0, resultString.length - 2);
      newResultString += "...";
    }
    return newResultString;
  }

  const retrieveAndSetAPIResults = (jsonData: string) => {
    setMainState({...mainState, fetchingData: true});

    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + SECRET_TOKEN,
      },
      body: jsonData
    }).then( (res) => {
      res.json().then((result: APIResult) => {
        if (res.status === 200){
          let resultString = result.choices[0].text;
          if (resultString.startsWith("Give me a random story prompt")){
            // This is from providing the 'echo' option, meaning this is a 
            // result from getting a random prompt
            resultString = formatResultString(resultString.substring(31));
            setMainState({...mainState, fetchingData: false, promptVal: resultString});
          }
          else{
            let newPromptArray = [...mainState.promptResponseObjects];
            newPromptArray.push({prompt: mainState.promptVal, response: formatResultString(resultString)});
            setMainState({...mainState, fetchingData: false, promptVal: "", promptResponseObjects: newPromptArray});
            window.scrollTo(0, document.body.scrollHeight);
          }
        }
        else{
          console.log(result);
          setMainState({...mainState, fetchingData: false});
        }
      });
    }).catch((e) => {
      console.log(e);
      setMainState({...mainState, fetchingData: false});
    });
  }

  const handleSubmit = () => {
    let jsonData = JSON.stringify({
      prompt: mainState.promptVal,
      temperature: 0.6,
      max_tokens: 64
    });
     
    retrieveAndSetAPIResults(jsonData);
  }

  const handleRandomPrompt = () => {
    // The same as submitting a prompt, except we hardcode in the prompt as
    // 'Give me a random story prompt'!
    let jsonData = JSON.stringify({
      prompt: "Give me a random story prompt",
      temperature: 0.6,
      max_tokens: 64,
      echo: true
    });

    retrieveAndSetAPIResults(jsonData);
  }

  return (
    <div className="App">
      <SplashScreen/>
      <LoadingScreen 
        loading={mainState.fetchingData}
      />
      <Header/>
      <PromptInput
          value={mainState.promptVal}
          onChange={handleOnChange}
          onSubmit={handleSubmit}
          onRandomPrompt={handleRandomPrompt}
          disable={mainState.fetchingData}
        />
        <ResponseList
          data={mainState.promptResponseObjects}  
        />
    </div>
  );
}

export default App;
