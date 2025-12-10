const axios = require("axios")
const readline = require("readline")

axios.defaults.validateStatus = () => true

function ask(question) {
    return new Promise(res => {
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        rl.question(question, answer => {
            rl.close()
            res(answer)
        })
    })
}

async function remove() {
    let token = await ask("enter your token: ")
    if (!token) return console.log("enter an valid token")

    let r = await axios.delete("https://discord.com/api/v10/hypesquad/online", {
        headers: {
            authorization: token
        }
    })

    if (r.status === 204) return console.log("removed")
    else return console.log("error occured", r.status, r.data)
}

remove()
