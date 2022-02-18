import React, {useState} from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './App.css';
import {fiveLetterWords} from "./fiveLetterWords";

function App() {
    const [guesses, setGuesses] = useState("")
    const [green, setGreen] = useState(false)

    const [word] = useState(fiveLetterWords[Math.floor( Math.random() * fiveLetterWords.length)].toUpperCase())
    console.log('>>>', word)

    const onChange = (input) => {
        console.log("Input changed", input);
    }

    const onKeyPress = (button) => {
        console.log('>>>', button)
        console.log('>>>guesses', guesses)
        console.log('>>>word', word)

        if (guesses.length === 5 && button === "{enter}") {
            console.log('>>>YO')
            setGreen(true)
        }
        if (button === "{bksp}") {
            setGuesses(guesses.substring(0, guesses.length - 1))
        } else if (guesses.length === 5) {
            return
        } else if (button !== "{enter}") {
            setGuesses(guesses + button);
        }
        console.log('>>>', guesses);
    }

    const evaluateGreenCss = (i) => {
        return green && guesses[i] !== undefined && guesses[i] === word[i]
    }

    return (
        <div className="App">
            <h1>Wordle</h1>
            <div className='guesses'>
                {Array.from(Array(30), (e, i) =>
                    <div className={`box ${evaluateGreenCss(i) && "green"}`} key={i}>{guesses[i]}</div>
                )}
            </div>
            <div className="keyboard">
                <Keyboard
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    layoutName="shift"
                    layout={{
                        shift: [
                            "Q W E R T Y U I O P {bksp}",
                            'A S D F G H J K L {enter}',
                            "Z X C V B N M",
                        ]
                    }}
                />
            </div>
        </div>
    );
}

export default App;
