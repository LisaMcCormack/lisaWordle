import { RequestMock, Selector } from 'testcafe';

const mock = RequestMock()
    .onRequestTo(/localhost:8080/)
    .respond((req, res) => {
        res.headers['access-control-allow-origin'] = '*';
        res.setBody(["alone"]);
    });

fixture`wordle`
    .page`http://192.168.8.103:3000/`
    .requestHooks(mock)

const green = 'rgb(106, 170, 100)'
const gray = 'rgb(120, 124, 126)'
const yellow = 'rgb(201, 180, 88)'

const inputWord = async (word: string[], t: TestController): Promise<void> => {
    await t
    for (const letter of word) {
        await t.click(Selector(`[data-skbtn="${letter}"]`));
    }
}

test('it shows a square as green if letter is in the right place and grey if the letter is not in the word', async t => {
    await inputWord(["A", "B", "O", "U", "T", "{enter}"], t)
        await t.expect(Selector('[data-guessed="A-0"]').getStyleProperty('background-color')).eql(green)
        .expect(Selector('[data-guessed="B-1"]').getStyleProperty('background-color')).eql(gray)
        .expect(Selector('[data-guessed="O-2"]').getStyleProperty('background-color')).eql(green)
        .expect(Selector('[data-guessed="U-3"]').getStyleProperty('background-color')).eql(gray)
        .expect(Selector('[data-guessed="T-4"]').getStyleProperty('background-color')).eql(gray)
})

test('it shows a square as yellow if word contains the letter but it is not in the right place', async t => {
    await inputWord(["B", "A", "D", "G", "E"], t)
    await t.click(Selector('[data-skbtnuid="shift-r1b9"]'))
        .expect(Selector('[data-guessed="A-1"]').getStyleProperty('background-color')).eql(yellow)
})

test('if guesses word has two Es but word only has one E in the right place only the right one E is green and the other gray', async t => {
    await inputWord(["H", "E", "D", "G", "E"], t)
    await t.click(Selector('[data-skbtnuid="shift-r1b9"]'))
        .expect(Selector('[data-guessed="E-1"]').getStyleProperty('background-color')).eql(gray)
        .expect(Selector('[data-guessed="E-4"]').getStyleProperty('background-color')).eql(green)
})

test('if guesses word has two Es but word only has one E in the right place only the right one E is green and the other gray 2', async t => {
    await inputWord(["E", "A", "G", "E", "R"], t)
    await t.click(Selector('[data-skbtnuid="shift-r1b9"]'))
        .expect(Selector('[data-guessed="E-0"]').getStyleProperty('background-color')).eql(gray)
        .expect(Selector('[data-guessed="E-3"]').getStyleProperty('background-color')).eql(yellow)
})