/* Atividade sobre callback:
    - obter um usuario
    - obter um numero de telefone do usiario a partir do seu ID
    - obter o endereço do usuario a partir do seu ID
*/

function getUser(callback) {
    setTimeout(function (){
        return callback(null, {
            id: 1,
            name: "Irineu",
            dateBirth: new Date()
        })
    }, 1000)
}

function getPhoneNumber(idUser, callback) {
    setTimeout(() => {
        return callback(null, {
            phoneNumer: '666 666',
            ddd: 79
        })
    }, 2000);
}

function getAddress(idUser, callback) {
    setTimeout(() => {
        return callback(null, {
            address: 'Beco Diagonal',
            number: '382'
        })
    }, 2000);
}

getUser(function resolverUser(error, user) {
    //null || "" || 0 === false
    if(error) {
        console.error('VISH, USER!', error)
        return
    }
    getPhoneNumber(user.id, function resolverPhone(error1, phone) {
        if(error1) {
            console.error('VISH PHONE NUMBER!', error)
            return
        }
        getAddress(user.id, function resolverAddress(error2, address) {
            if(error2) {
                console.error('VISH ADDRESS', error)
                return
            }

            console.log(`
            Nome: ${user.name}
            Endereço: ${address.address}, ${address.number}
            Telefone: (${phone.ddd}) ${phone.phoneNumer}
            `)
        })
    })
})
    
    
