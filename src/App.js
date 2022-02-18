import React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './App.css';

function App() {
    const onChange = (input) => {
        console.log("Input changed", input);
    }

    const onKeyPress = (button) => {
        console.log("Button pressed", button);
    }

    return (
        <div className="App">
            <h1>Wordle</h1>
            <div className='guesses'>
                {Array.from(Array(30), () =>
                  <div className="box"/>
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
