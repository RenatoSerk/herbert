import React from 'react';
import '../stylesheets/App.css';
import { Header } from './Header';
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

const SECRET_TOKEN = '';

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
            console.log(result);
            console.log(result.choices[0].text + "...");
            setMainState({...mainState, fetchingData: false, promptVal: ""});
          }
        }
        else{
          console.log(result);
        }
      });
    }).catch((e) => {
      console.log(e);
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
