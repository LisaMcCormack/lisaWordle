import React, {useState} from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './App.css';

function App() {
    const [guesses, setGuesses] = useState("")

    const onChange = (input) => {
        console.log("Input changed", input);
    }

    const onKeyPress = (button) => {
        console.log('>>>', button)
        if (button === '{bksp}') {
            setGuesses(guesses.substring(0, guesses.length - 1))
        } else {
            setGuesses(guesses + button);
        }
        console.log('>>>', guesses);
    }

    return (
        <div className="App">
            <h1>Wordle</h1>
            <div className='guesses'>
                {Array.from(Array(30), (e, i) =>
                    <div className="box" key={i}>{guesses[i]}</div>
                )}
            </div>
            <div className="keyboard">
                <Keyboard
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                />
            </div>
        </div>
    );
}

export default App;
