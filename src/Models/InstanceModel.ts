import * as venom from 'venom-bot'
//const venom = require('venom-bot')
//import * as venom from "../../node_modules/venom-bot/dist/index"

export class InstanceModel {
    username: string;
    password: string;
    status: string;
    client: venom.Whatsapp;
    
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
    
    public CreateInstance() {
        venom
            .create(
                this.username,
                undefined,
                (statusSession, session) => {
                    this.status = statusSession
                },
                undefined,
                undefined,
                undefined
            )
            .then((client) => {
                this.GenerateJSONCredentials(this.username, this.password)
                this.client = client;
            })
            .catch((erro) => {
                console.log(erro);
            });
    }

    private GenerateJSONCredentials(username: string, password: string) {
        var credentials = JSON.stringify({
            username: username,
            password: password
        })
    
        const path = require('path');
        var fs = require('fs')
    
        const directoryPath = path.join(__dirname, '../../tokens');
    
        fs.writeFile(`${directoryPath}/${username}/${username}.json`, credentials, function (err, result) {
            if (err)
                //throw new ErrorModel(this.constructor.name, err, 500)
                console.log(err);
        })
    }
}