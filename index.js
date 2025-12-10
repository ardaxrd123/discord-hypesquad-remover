const readline = require("readline")

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

    let r = await fetch("https://discord.com/api/v10/hypesquad/online", {
        method: "DELETE",
        headers: {
            authorization: token,
        }
    })

    if (r.status === 204) return console.log("removed")
    else {
        let text = await r.text().catch(() => null)
        return console.log("error occured", r.status, text)
    }
}

remove()
