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

function getPhoneNumber(idUser, ) {
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

//para manipular sucesso usamos .then()
//para manipular erro usamos .catch()
const userPromise = getUser()
userPromise
    .then(function (user){
        return getPhoneNumber(user.id)
            .then(function solvePhone(resultado) {
                return {
                    usuario: {
                        nome: user.name,
                        id: user.id
                    },
                    telefone: resultado
                }
            })
    })
    .then(function (result){
        const address = getAddressAsync(result.usuario.id)
        return address.then(function solveAddress(resultado) {
            return {
                usuario: result.usuario,
                telefone: result.telefone,
                endereco: resultado
            }
        })
    })
    .then(function (result) {
        console.log(`
            Nome: ${result.usuario.nome}
            Endereco: ${result.endereco.address}, ${result.endereco.number}
            Tell: (${result.telefone.ddd}) ${result.telefone.phoneNumer}
        `)
    })
    .catch(function (error){
        console.error('VISH, UM ERRO', error)
    })

// getUser(function resolverUser(error, user) {
//     //null || "" || 0 === false
//     if(error) {
//         console.error('VISH, USER!', error)
//         return
//     }
//     getPhoneNumber(user.id, function resolverPhone(error1, phone) {
//         if(error1) {
//             console.error('VISH PHONE NUMBER!', error)
//             return
//         }
//         getAddress(user.id, function resolverAddress(error2, address) {
//             if(error2) {
//                 console.error('VISH ADDRESS', error)
//                 return
//             }

//             console.log(`
//             Nome: ${user.name}
//             Endereço: ${address.address}, ${address.number}
//             Telefone: (${phone.ddd}) ${phone.phoneNumer}
//             `)
//         })
//     })
// })