/* Atividade sobre callback:
    - obter um usuario
    - obter um numero de telefone do usiario a partir do seu ID
    - obter o endereço do usuario a partir do seu ID
*/

//manupilação feita pelo módulo interno do node.js (convertendo a função com callback para Promise sem fazer alterações na função existente)
const util = require('util')
const getAddressAsync = util.promisify(getAddress)

function getUser() {
    //Se der algo errado -> reject(ERROR)
    //Se der certo -> resolve()
    return new Promise(function solvePromise(resolve, reject) {
        setTimeout(function (){
            //return reject(new Error('TESTE DE ERRO!'))
            return resolve({
                id: 1,
                name: "Irineu",
                dateBirth: new Date()
            })
        }, 1000)
    })
}

function getPhoneNumber(idUser) {
    return new Promise(function solvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                phoneNumer: '666 666',
                ddd: 79
            })
        }, 2000);
    })
}

function getAddress(idUser, callback) {
    setTimeout(() => {
        return callback(null, {
            address: 'Beco Diagonal',
            number: '382'
        })
    }, 2000);
}

main()
async function main() {
    try {
        //capturando o usuario
        console.time('medida-promise')
        const user = await getUser()
        // const phone = await getPhoneNumber(user.id)
        // const address = await getAddressAsync(user.id)
        //Utilizando o Promise.all() o tempo de execucao eh menor
        const result = await Promise.all([
            getPhoneNumber(user.id),
            getAddressAsync(user.id)
        ])
        const phone = result[0]
        const address = result[1]
        console.log(`
            Nome: ${user.name},
            Tell: (${phone.ddd}) ${phone.phoneNumer}
            Endereco: ${address.address}, ${address.number}
        `)
        console.timeEnd('medida-promise')

    } catch(error) {
        console.log('VISH UM ERRO', error)
    }
}