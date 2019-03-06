const EventEmitter = require('events')

class MyEmitter extends EventEmitter {

}

const myEmitter = new MyEmitter()
const newEvent = 'user:click'

myEmitter.on(newEvent, function (click) {
    console.log('This is a click test!', click)
})

// //simulacao de que o evento do click ta ocorrendo
// myEmitter.emit(newEvent, 'Funciona?')
// myEmitter.emit(newEvent, 'YEY FUNCIONA!')

// //evento ocorrendo a cada 1 segundo
// let count = 0
// setInterval(function (){
//     myEmitter.emit(newEvent, 'YEY FUNCIONA! ' + count ++)
// }, 1000)


//exemplo com eventos no terminal (um texto digitado no terminal será printado na tela)
const stdin = process.openStdin()
stdin.addListener('data', function (value) {
    console.log(`Voce digitou: ${value.toString().trim()}`)
})


// //exemplo com Promise para verificar a diferença na execução 
// const stdin = process.openStdin()
// function main() {
//     return new Promise(function (resolve, reject) {
//         stdin.addListener('data', function (value) {
//             return resolve(value)
//         })        
//     })
// }
// main().then(function (result) {
//     console.log('escreveu:', result.toString())
// })