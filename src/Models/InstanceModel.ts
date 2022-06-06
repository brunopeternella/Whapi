import * as venom from 'venom-bot'
//const venom = require('venom-bot')
//import * as venom from "../../node_modules/venom-bot/dist/index"

export class InstanceModel {
    username: string;
    password: string;
    status: string;
    client: venom.Whatsapp;
    base64QRCode: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
    
    public CreateInstance(res: any) {
        venom
            .create(
                this.username,
                (base64Qrimg) => {
                    this.base64QRCode = base64Qrimg;
                    if(res != null)
                        return res.status(201).json({
                            message: "Instance created successfully",
                            link: "https://base64.guru/converter/decode/image",
                            base64QRCode: this.base64QRCode
                        });
                },
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