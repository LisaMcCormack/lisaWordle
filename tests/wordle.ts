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

test('it shows a square as green if letter is in the right place and grey if the letter is not in the word', async t => {
    await t
        .click(Selector('[data-skbtn="A"]'))
        .click(Selector('[data-skbtn="B"]'))
        .click(Selector('[data-skbtn="O"]'))
        .click(Selector('[data-skbtn="U"]'))
        .click(Selector('[data-skbtn="T"]'))
        .click(Selector('[data-skbtnuid="shift-r1b9"]'))
        .expect(Selector('[data-guessed="A-0"]').getStyleProperty('background-color')).eql(green)
        .expect(Selector('[data-guessed="B-1"]').getStyleProperty('background-color')).eql(gray)
        .expect(Selector('[data-guessed="O-2"]').getStyleProperty('background-color')).eql(green)
        .expect(Selector('[data-guessed="U-3"]').getStyleProperty('background-color')).eql(gray)
        .expect(Selector('[data-guessed="T-4"]').getStyleProperty('background-color')).eql(gray)
})

test('it shows a square as yellow if word contains the letter but it is not in the right place', async t => {
    await t
        .click(Selector('[data-skbtn="B"]'))
        .click(Selector('[data-skbtn="A"]'))
        .click(Selector('[data-skbtn="D"]'))
        .click(Selector('[data-skbtn="G"]'))
        .click(Selector('[data-skbtn="E"]'))
        .click(Selector('[data-skbtnuid="shift-r1b9"]'))
        .expect(Selector('[data-guessed="A-1"]').getStyleProperty('background-color')).eql(yellow)
})

test.only('if guesses word has two Es but word only has one E in the right place only the right one E is green and the other gray', async t => {
    await t
        .click(Selector('[data-skbtn="H"]'))
        .click(Selector('[data-skbtn="E"]'))
        .click(Selector('[data-skbtn="D"]'))
        .click(Selector('[data-skbtn="G"]'))
        .click(Selector('[data-skbtn="E"]'))
        .click(Selector('[data-skbtnuid="shift-r1b9"]'))
        .expect(Selector('[data-guessed="E-1"]').getStyleProperty('background-color')).eql(gray)
        .expect(Selector('[data-guessed="E-4"]').getStyleProperty('background-color')).eql(green)
})