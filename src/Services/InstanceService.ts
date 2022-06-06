//const path = require('path');
import * as path from 'path'
import * as fs from 'fs';
import { InstanceModel } from '../Models/InstanceModel';

export class InstanceService{
    type: string;
    status: number;
    name: string;
    message: string;
    stack?: string;

    public LoadInstances(instances: Array<InstanceModel>) {        

        const directoryPath = path.join(__dirname, '../../tokens');

        fs.readdir(directoryPath, function (err, files) {

            if (err) 
                return console.log('Unable to scan directory: ' + err);
            
            else {
                if (!files.length) {
                    console.log('No instances found!');

                    var instanceModel: InstanceModel;

                    instanceModel = new InstanceModel('Admin', 'dksaopdksopakdsopadksaop')
                    instanceModel.CreateInstance(null)

                    instances.push(instanceModel)
                } else {
                    files.forEach(function (instanceName) {
                        console.log('Loading Instances!');

                        var instanceModel: InstanceModel;

                        var credential = JSON.parse(fs.readFileSync(`tokens/${instanceName}/${instanceName}.json`).toString())

                        instanceModel = new InstanceModel(credential.username, credential.password)
                        instanceModel.CreateInstance(null)

                        instances.push(instanceModel)
                    });
                }
            }
        });
    }
}