import React, {useCallback, useEffect, useState} from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './App.css';
import {fiveLetterWords} from "./fiveLetterWords";

function App() {
    const [guesses, setGuesses] = useState('')
    const [word] = useState(fiveLetterWords[Math.floor( Math.random() * fiveLetterWords.length)].toUpperCase())
    const [oldAttempts, setOldAttempts] = useState('')
    console.log('>>>', word)

    const onKeyPress = (button) => {
        if (button === "{bksp}") {
            setGuesses(guesses.substring(0, guesses.length - 1))
        } else if (button === "{enter}" && guesses.length === 5) {
            setOldAttempts(oldAttempts + guesses);
            setGuesses('')
        } else if (button !== "{enter}") {
            setGuesses(guesses + button)
        }
    }

    const evaluateGreenCss = (i) => {
        const repeatWord = word.repeat(6)
        if (oldAttempts[i] === repeatWord[i]) {
            return true
        }
    }

    const evaluateGrayCss = (i) => {
        if (word.includes(oldAttempts[i])) {
            return true
        }
    }

    return (
        <div className="App">
            <h1>Wordle</h1>
            <div className='guesses'>
                {Array.from(Array(oldAttempts.length), (e, i) =>
                    <div className={`box ${evaluateGreenCss(i) && "green"} ${evaluateGrayCss(i) && 'gray'}`} key={i}>{oldAttempts[i]}</div>
                )}
                {Array.from(Array(5), (e, i) =>
                    <div className={'box'} key={i}>{guesses[i]}</div>
                )}
                {Array.from(Array(30 - oldAttempts.length - 5), (e, i) =>
                    <div className="box" key={i}/>
                )}
            </div>
            <div className="keyboard">
                <Keyboard
                    // onChange={onChange}
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
