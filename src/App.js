import React, {useEffect, useState} from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './App.css';
import axios from "axios";

function App() {
    const [guesses, setGuesses] = useState('')
    const [word, setWord] = useState("")
    const [oldAttempts, setOldAttempts] = useState('')

    useEffect(() => {
        axios('http://localhost:8080/').then(res => {
            setWord(res.data[Math.floor(Math.random() * res.data.length)].toUpperCase());
        })
    }, [])

    console.log('>>>',word)

    useEffect(() => {
        if (oldAttempts.length && oldAttempts.substr(oldAttempts.length - 5) === word) {
            setTimeout(() => {
                alert('you won')
            }, 20)
        }  else if (oldAttempts.length === 30) {
            setTimeout(() => {
                alert(`the word was ${word}`)
            }, 20)
        }
    }, [oldAttempts, word])

    const onKeyPress = (button) => {
        if (oldAttempts.substr(oldAttempts.length - 5) === word) {
            return
        }
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


    const evaluateYellowCss = (i) => {
        if (word.includes(oldAttempts[i])) {
            return true
        }
    }

    const evaluateGrayCss = (i) => {
        const attempts = oldAttempts.match(/.{1,5}/g) ?? []
        const index = Math.floor(i/5)
        if (!word.includes(oldAttempts[i]) || (oldAttempts.slice(i+1, (index+1)*5).includes(oldAttempts[i]) && attempts[index].split(oldAttempts[i]).length - 1 > word.split(oldAttempts[i]).length - 1 )) {
            return true
        }
    }

    const evaluateYellowKeyBoardKey = () => {
        let string = ' '
        oldAttempts.split('').forEach((l) => {
            if (word.includes(l)) {
                string = string + `${l} `
            }
        })
        return string
    }

    const evaluateGreenKeyBoardKey = () => {
        let string = ' '
        const attempts = oldAttempts.match(/.{1,5}/g) ?? []
        attempts.forEach(w => {
            for (let i = 0; i < 5; i++) {
               if (w[i] === word[i] && !string.includes(w[i])) {
                   string = string + `${w[i]} `
               }
            }
        })

        return string
    }

    const evaluateGrayKeyBoardKey = () => {
        let string = ' '
        oldAttempts.split('').forEach((l) => {
            if (!word.includes(l)) {
                string = string + `${l} `
            }
        })
        return string
    }

    return (
        <div className="App">
            <h1>Wordle</h1>
            <div className='guesses'>
                {Array.from(Array(oldAttempts.length), (e, i) =>
                    <div className={`box ${evaluateGrayCss(i) && 'gray'} ${evaluateGreenCss(i) && "green"} ${evaluateYellowCss(i) && 'yellow'}  A`}
                         key={i} data-guessed={`${oldAttempts[i]}-${i}`}>{oldAttempts[i]}</div>
                )}
                {Array.from(Array(oldAttempts.length === 30 ? 0 : 5), (e, i) =>
                    <div className={'box B'} key={i}>{guesses[i]}</div>
                )}
                {Array.from(Array(Math.max(30 - oldAttempts.length - 5, 0)), (e, i) =>
                    <div className="box C" key={i}/>
                )}
            </div>
            <div className="keyboard">
                <Keyboard
                    onKeyPress={onKeyPress}
                    layoutName="shift"
                    layout={{
                        shift: [
                            "Q W E R T Y U I O P {bksp}",
                            'A S D F G H J K L {enter}',
                            "Z X C V B N M",
                        ]
                    }}
                    buttonTheme={[
                        {
                            class: "hg-green",
                            buttons: evaluateGreenKeyBoardKey()
                        },
                        {
                            class: "hg-yellow",
                            buttons: evaluateYellowKeyBoardKey()
                        },
                        {
                            class: "hg-gray",
                            buttons: evaluateGrayKeyBoardKey()
                        }
                    ]}

                />
            </div>
        </div>
    );
}

export default App;
